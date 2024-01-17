import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-final-form';
import { Button, Modal, ModalFooter } from '@folio/stripes/components';

const ProxyServerSettingsFormModal = ({
  modalProps: { footer, onClose, ...modalProps },
  children,
  onSubmit,
  ...formProps
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      {...formProps}
    >
      {({ handleSubmit, form: { getState, restart } }) => {
        const formState = getState();
        const handleClose = (e) => {
          onClose(e);
          restart();
        };

        const saveAndCloseForm = e => {
          handleSubmit();
          handleClose(e);
        };

        const renderFooter = () => {
          if (footer) {
            return footer({ formState, handleSubmit, handleClose });
          }

          const { invalid, pristine, submitting } = formState;
          return (
            <ModalFooter>
              <Button
                buttonStyle="primary"
                disabled={submitting || invalid || pristine}
                marginBottom0
                onClick={saveAndCloseForm}
                type="submit"
              >
                <FormattedMessage id="stripes-components.saveAndClose" />
              </Button>
              <Button
                marginBottom0
                onClick={handleClose}
              >
                <FormattedMessage id="stripes-components.cancel" />
              </Button>
            </ModalFooter>
          );
        };

        return (
          <form
            onSubmit={handleSubmit}
          >
            <Modal
              enforceFocus={false}
              footer={renderFooter()}
              onClose={handleClose}
              {...modalProps}
            >
              {children}
            </Modal>
          </form>
        );
      }}
    </Form>
  );
};

ProxyServerSettingsFormModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  modalProps: PropTypes.shape({
    footer: PropTypes.func,
    onClose: PropTypes.func,
  }),
  onSubmit: PropTypes.func
};

export default ProxyServerSettingsFormModal;