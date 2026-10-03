import { useCallback, useEffect, useRef, useState } from 'react';
import { CHATBOT_PROFILES } from '../data/chatProfiles';

let nextId = 1;

/**
 * Lógica del Copiloto IA flotante: abrir/cerrar, aviso de no leído, sugerencias,
 * indicador "escribiendo…" y respuestas simuladas según la plataforma.
 * `getContext()` devuelve los datos de la app en el momento de responder.
 */
export function useChatbot(role, getContext) {
  const profile = CHATBOT_PROFILES[role] || CHATBOT_PROFILES.driver;
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [
    { id: nextId++, from: 'agent', text: profile.greeting(getContext()) }
  ]);

  const inputRef = useRef(null);
  const toggleRef = useRef(null);
  const messagesRef = useRef(null);
  const prevOpen = useRef(open);

  // Foco: al abrir va al campo de texto; al cerrar vuelve al botón (solo cuando cambia)
  useEffect(() => {
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    if (open) {
      setUnread(false);
      inputRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [open]);

  // Escape cierra el chat
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && open) setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Mantiene visible el último mensaje
  useEffect(() => {
    const box = messagesRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages]);

  const send = useCallback(raw => {
    const text = raw.trim();
    if (!text) return;
    const typingId = nextId++;
    setMessages(list => [
      ...list,
      { id: nextId++, from: 'user', text },
      { id: typingId, from: 'agent', typing: true, text: `${profile.name} está escribiendo…` }
    ]);
    setInput('');

    // Respuesta simulada inteligente basada en contexto
    setTimeout(() => {
      const reply = profile.reply(text.toLowerCase(), getContext());
      setMessages(list => [...list.filter(m => m.id !== typingId), { id: nextId++, from: 'agent', text: reply }]);
    }, 600);
  }, [profile, getContext]);

  const sendSuggestion = label => {
    send(label);
    setShowSuggestions(false);
  };

  return {
    profile,
    open,
    setOpen,
    toggle: () => setOpen(o => !o),
    unread,
    showSuggestions,
    input,
    setInput,
    messages,
    send,
    sendSuggestion,
    refs: { inputRef, toggleRef, messagesRef }
  };
}
