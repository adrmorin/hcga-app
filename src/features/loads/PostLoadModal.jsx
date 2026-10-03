import { Button } from '../../components/ui/Button';
import { FormGroup, Input, Select } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';

/** Publicar una carga nueva con tarifa bloqueada (Flotilla, Embarcador y Torre de Control). */
export function PostLoadModal({ open, onClose, onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal id="modal-post-load" titleId="modal-post-title" title="Publicar Nueva Cargas con Tarifa Bloqueada" open={open} onClose={onClose}>
      <form id="form-post-load" onSubmit={handleSubmit}>
        <FormGroup label="Ciudad de Origen" htmlFor="post-origin">
          <Input type="text" id="post-origin" placeholder="ej: Miami, FL" required />
        </FormGroup>
        <FormGroup label="Ciudad de Destino" htmlFor="post-dest">
          <Input type="text" id="post-dest" placeholder="ej: Atlanta, GA" required />
        </FormGroup>
        <div className="grid grid-cols-[1fr_1fr] gap-xs">
          <FormGroup label="Tipo de Equipo" htmlFor="post-equip">
            <Select id="post-equip">
              <option>Reefer (53ft)</option>
              <option>Dry Van (53ft)</option>
              <option>Flatbed (48ft)</option>
            </Select>
          </FormGroup>
          <FormGroup label="Tarifa Total ($ USD)" htmlFor="post-rate">
            <Input type="number" id="post-rate" placeholder="2450" required />
          </FormGroup>
        </div>
        <Button type="submit" block>Publicar Carga en Mercado</Button>
      </form>
    </Modal>
  );
}
