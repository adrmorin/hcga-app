// Tabla de datos con desplazamiento horizontal propio (.table-wrapper + .data-table)
const CELL = 'py-sm px-md [border-block-end:1px_solid_var(--color-border-subtle)]';
// Etiquetas técnicas: IBM Plex Mono 600, mayúsculas +0.1em (Brand Book)
const TH = `${CELL} bg-elevated font-mono font-semibold text-xs text-muted uppercase tracking-[0.1em]`;

export function DataTable({ columns, rows, renderRow }) {
  return (
    <div className="w-full overflow-x-auto rounded-sm border border-solid border-border-subtle">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map(col => <th key={col} className={TH}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="[&:hover>td]:bg-[rgba(255,255,255,0.04)]">
              {renderRow(row).map((cell, j) => <td key={j} className={CELL}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
