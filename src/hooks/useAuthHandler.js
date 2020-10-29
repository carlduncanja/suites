import React, {useEffect} from 'react';
import {useModal} from 'react-native-modalfy';
import ConfirmationComponent from '../components/ConfirmationComponent';

export default function useAuthHandler(error, callback) {
    const modal = useModal();

    useEffect(() => {
        if (error?.response && error?.response?.status === 401) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError
                        isEditUpdate={false}
                        onCancel={() => modal.closeAllModals()}
                        onAction={() => modal.closeAllModals()}
                        titleText="Unauthorized"
                        message="Unauthorized User. Cannot Process Request"
                    />
                ),
                onClose: () => console.info('modal.closed'),
            });
        }
    }, []);

    if (error?.response && error?.response?.status === 401 && callback) return callback;
    return null;
}
