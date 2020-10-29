import Component from '@glimmer/component';
import { action } from '@ember/object';

interface ModalCloseButtonArgs {}

export default class ModalCloseButton extends Component<ModalCloseButtonArgs> {
  @action handleClose(): void {
    if (typeof this.args.onClose === 'function') {
      this.args.onClose();
    }
  }
}
