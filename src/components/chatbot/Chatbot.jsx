import { cx } from '../../lib/cx';
import { useChatbot } from '../../hooks/useChatbot';
import { Button } from '../ui/Button';
import { Input } from '../ui/Form';
import { ChatIcon, CloseIcon, PLATFORM_ICONS, SendIcon } from '../icons/Icons';

const FAB_ICON = 'w-[26px] h-[26px] [grid-area:1/1] transition-[opacity,transform] duration-fast ease-standard';

function Bubble({ from, typing, children }) {
  return (
    <div
      className={cx(
        'max-w-[80%] py-sm px-md rounded-md text-sm leading-[1.4]',
        from === 'user'
          ? 'self-end bg-brand-bright text-[#ffffff] rounded-ee-xs'
          : 'self-start bg-surface border border-solid border-border-subtle rounded-es-xs',
        typing && 'text-fg-secondary italic'
      )}
    >
      {children}
    </div>
  );
}

/**
 * Copiloto IA flotante: botón siempre visible con la plataforma identificada
 * y panel de chat desplegable (en móvil, hoja inferior a pantalla completa).
 */
export function Chatbot({ role, getContext }) {
  const chat = useChatbot(role, getContext);
  const { profile, open, refs } = chat;
  const Icon = PLATFORM_ICONS[profile.icon];

  return (
    <div
      id="chatbot"
      className={cx(
        'fixed bottom-[calc(var(--space-md)_+_env(safe-area-inset-bottom,0px))] right-[calc(var(--page-gutter)_+_env(safe-area-inset-right,0px))] z-chatbot flex flex-col items-end gap-sm',
        // Móvil: oscurece la página detrás de la hoja; tocar el fondo cierra el chat
        open && "phone:before:content-[''] phone:before:fixed phone:before:inset-0 phone:before:bg-[rgba(0,0,0,0.55)]"
      )}
      onClick={e => { if (e.target === e.currentTarget && open) chat.setOpen(false); }}
    >
      {open && (
        <section
          id="chatbot-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chatbot-title"
          className="flex flex-col w-[min(380px,calc(100vw_-_6vw))] h-[min(560px,calc(100dvh_-_180px))] bg-elevated border border-solid border-border-default rounded-md [box-shadow:var(--shadow-md),0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden origin-bottom-right animate-chatbot-in phone:fixed phone:inset-x-0 phone:bottom-0 phone:w-full phone:h-[min(85dvh,640px)] phone:[border-radius:var(--radius-md)_var(--radius-md)_0_0] phone:pb-[env(safe-area-inset-bottom,0px)] phone:origin-bottom"
        >
          <header className="flex items-center gap-sm py-sm px-md bg-[linear-gradient(135deg,var(--color-brand-red-dark)_0%,var(--color-brand-red)_100%)] text-[#ffffff]">
            <span className="grid place-items-center shrink-0 w-[36px] h-[36px] rounded-circle bg-[rgba(255,255,255,0.15)] [&>svg]:w-[18px] [&>svg]:h-[18px]" aria-hidden="true">
              <Icon />
            </span>
            <div className="flex-1 min-w-0">
              <h3 id="chatbot-title" className="text-sm text-[#ffffff]">{profile.name}</h3>
              <span className="flex items-center gap-[6px] text-xs text-[rgba(255,255,255,0.8)]">
                <span className="w-[8px] h-[8px] rounded-circle bg-status-success" />
                Plataforma {profile.platform} · IA 24/7
              </span>
            </div>
            <button
              type="button"
              className="grid place-items-center w-[36px] h-[36px] rounded-circle text-[#ffffff] hover:bg-[rgba(255,255,255,0.15)] [&>svg]:w-[20px] [&>svg]:h-[20px]"
              aria-label="Cerrar asistente"
              onClick={() => chat.setOpen(false)}
            >
              <CloseIcon />
            </button>
          </header>

          <div ref={refs.messagesRef} className="flex-1 p-md overflow-y-auto flex flex-col gap-sm min-h-0" aria-live="polite">
            {chat.messages.map(m => <Bubble key={m.id} from={m.from} typing={m.typing}>{m.text}</Bubble>)}
          </div>

          {chat.showSuggestions && (
            <div className="flex gap-xs px-sm pb-sm pt-0 overflow-x-auto [scrollbar-width:none]">
              {profile.chips.map(label => (
                <button
                  key={label}
                  type="button"
                  className="shrink-0 py-[6px] px-[12px] rounded-full border border-solid border-border-default bg-surface text-fg-primary text-xs font-semibold whitespace-nowrap hover:border-accent"
                  onClick={() => chat.sendSuggestion(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-xs p-sm bg-surface [border-block-start:1px_solid_var(--color-border-subtle)]">
            <Input
              ref={refs.inputRef}
              type="text"
              placeholder={`Pregunta al ${profile.name}...`}
              aria-label={`Escribe tu mensaje al ${profile.name}`}
              value={chat.input}
              onChange={e => chat.setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') chat.send(chat.input); }}
            />
            <Button size="sm" aria-label="Enviar mensaje" onClick={() => chat.send(chat.input)}>
              <SendIcon width="16" height="16" />
            </Button>
          </div>
        </section>
      )}

      <button
        ref={refs.toggleRef}
        type="button"
        className={cx(
          'relative grid place-items-center w-[58px] h-[58px] rounded-circle bg-brand-bright text-[#ffffff] border-2 border-solid border-[rgba(255,255,255,0.2)] [box-shadow:var(--shadow-brand),var(--shadow-md)] transition-[transform,background-color] duration-fast ease-standard hover:bg-brand hover:[transform:translateY(-2px)]',
          open && 'phone:hidden'
        )}
        aria-controls="chatbot-panel"
        aria-expanded={open}
        aria-label={open ? `Cerrar ${profile.name}` : `Abrir ${profile.name}`}
        title={profile.name}
        onClick={chat.toggle}
      >
        <ChatIcon className={cx(FAB_ICON, open && 'opacity-0 [transform:rotate(90deg)]')} />
        <CloseIcon className={cx(FAB_ICON, open ? 'opacity-100 [transform:none]' : 'opacity-0 [transform:rotate(-90deg)]')} />
        {chat.unread && (
          <span className="absolute top-[-4px] right-[-4px] min-w-[20px] h-[20px] px-2 rounded-full bg-status-success text-black text-caption font-token-bold leading-[20px] text-center">1</span>
        )}
        <span className="absolute bottom-[-4px] left-[-4px] grid place-items-center w-[24px] h-[24px] rounded-circle bg-elevated border-2 border-solid border-accent text-icon" aria-hidden="true">
          <Icon className="w-[13px] h-[13px] [grid-area:1/1]" />
        </span>
      </button>
      <span
        className={cx(
          'min-w-[58px] mt-[calc(-1*var(--space-xs))] py-0.5 px-2 rounded-full bg-translucent border border-solid border-border-default text-fg-primary text-caption font-token-bold tracking-[0.04em] text-center uppercase whitespace-nowrap shadow-sm',
          open && 'phone:hidden'
        )}
        aria-hidden="true"
      >
        {profile.platform}
      </span>
    </div>
  );
}
