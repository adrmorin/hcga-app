import { cx } from '../../lib/cx';

const MARKER = 'absolute start-[-23px] top-[3px] w-[16px] h-[16px] rounded-circle border-2 border-solid z-[1]';

const MARKER_STATE = {
  default: 'bg-elevated border-border-strong',
  active: 'bg-brand-bright border-[#ffffff] [box-shadow:0_0_0_4px_var(--color-brand-red-glow)]',
  completed: 'bg-status-success border-status-success'
};

/** Línea de tiempo vertical (.timeline) */
export function Timeline({ children }) {
  return (
    <div className="flex flex-col gap-md relative ps-md before:content-[''] before:absolute before:start-[9px] before:top-[4px] before:bottom-[4px] before:w-[2px] before:bg-border-default">
      {children}
    </div>
  );
}

export function TimelineItem({ state = 'default', children }) {
  return (
    <div className="relative flex flex-col gap-2xs">
      <div className={cx(MARKER, MARKER_STATE[state])} />
      {children}
    </div>
  );
}
