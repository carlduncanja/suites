export const QUOTATION_STATUS = {
    /**
     * Initial status for all charge sheets, at this state the quotation can be edited.
     */
    DRAFT: "draft",

    /**
     * Quotation has been finalized and is now being used as the reference for the bill to be payed by the customer.
     *
     * NB. Only on quotation in the can be open at a time for a case.
     */
    OPEN: "open",

    /**
     * The quotation is now attached to an invoices that has been sent out to a customer.
     * and the item are to removed from the system
     * At this point the inventory item are removed from the system.
     */
    BILLED: "billed",

    /**
     * This quotation was mistake and should be cancelled
     * at this state the items taken out the system would be inserted
     */
    VOID: "void",

    /**
     * This quotation was cancelled an new quotation has been generation.
     */
    CANCELLED: "cancelled",
};

export const PURCHASE_ORDER_STATUSES = {
    /**
     * A this state the purchase order has been created
     * and still in editing state
     */
    PENDING: "pending",

    /**
     * A this state the requisition has been approved by an admin,
     *
     *
     * The requisition can now be sent for approval
     *
     */
    APPROVED: "approved",

    /**
     * A quotation request has been sent to the supplier
     *
     *
     */
    QUOTATION_REQUESTED: "quotation_requested",

    /**
     * Purchases order has been invoices and the inventory items are now in system.
     * A this point the purchases order is considered paid.
     */
    BILLED: "billed",

    /**
     *
     */
    CANCELLED: "cancelled",

    /**
     *
     */
    VOIDED: "voided",
};

export const ORDER_TYPES = {
    REQUISITION: "requisition",

    PURCHASE_ORDER: "purchase_order",
};

export const ROLES = {
    GUEST: "Guest",
    ADMIN: "Admin",
    NURSE: "Nurse",
    ASSISTANT: "Assistant",
};

export const LONG_PRESS_TIMER = {
    SHORT: 400,
    MEDIUM: 700,
    LONG: 1200,
};

export const emptyFn = () => {};

export const DISABLED_COLOR = (theme) => theme.colors["--color-gray-600"];

export const RECORDS_PER_PAGE = 12;
