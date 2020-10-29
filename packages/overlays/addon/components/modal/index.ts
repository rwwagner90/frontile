import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { OverlayArgs } from '../overlay';

interface ModalArgs extends Omit<OverlayArgs, 'contentTransitionName'> {
  /*
   * The name of the transition to be used in the modal.
   * @defaultValue `overlay--transition--zoom`
   */
  transitionName?: string;

  /* If set to false, the close button will not be displayed,
   * closeOnOutsideClick will be set to false, and closeOnEscapeKey will also be set
   * to false.
   *
   * @defaultValue true
   */
  allowClosing?: boolean;

  /*
   * If set to true, the modal will be vertically centered
   * @defaultValue false
   */
  isCentered?: boolean;
}

export default class Modal extends Component<ModalArgs> {
  headerId = `${guidFor(this)}-header`;

  get preventClosing(): boolean {
    return this.args.allowClosing === false;
  }


}
