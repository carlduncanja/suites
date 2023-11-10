import { createModalStack } from 'react-native-modalfy';

import OverlaySlidePanelModal from '../modals/OverlaySlidePanelModal';
import OverlayModal from '../modals/OverlayModal';
import ActionContainerModal from '../modals/ActionContainerModal';
import ReportPreviewModal from '../modals/ReportPreviewModal';
import PrintScheduleModal from '../modals/PrintScheduleModal';
import OverlayInfoModal from '../modals/OverlayInfoModal';
import BottomSheetModal from '../modals/BottomSheetModal';
import QuickActionsModal from '../modals/QuickActionsModal';
import ConfirmationModal from '../modals/ConfirmationModal';
import AddWorkItemModal from '../modals/AddWorkItemModal';
import EditWorkItemModal from '../modals/EditWorkItemModal';

const modalConfig = {
    OverlaySlidePanelModal,
    OverlayModal,
    ActionContainerModal,
    ReportPreviewModal,
    PrintScheduleModal,
    OverlayInfoModal,
    BottomSheetModal,
    QuickActionsModal,
    ConfirmationModal,
    AddWorkItemModal,
    EditWorkItemModal,
};

const defaultOptions = {
    backdropOpacity: 0,
    position: 'bottom',
    containerStyle: {
        flex: 1,
        alignItems: 'flex-end',
    },
};

export const useGetModalStack = () => {
    const stack = createModalStack(modalConfig, defaultOptions);
    return stack
}
