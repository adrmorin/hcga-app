// Une clases condicionales: cx('a', cond && 'b', 'c') → "a b c"
export const cx = (...classes) => classes.filter(Boolean).join(' ');
