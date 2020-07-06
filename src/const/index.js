

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
    CANCELLED: "cancelled"
}


export const PURCHASE_ORDER_STATUSES = {
    /**
     * A this state the purchase order has been created
     * and still in editing state
     */
    DRAFTED: "drafted",

    /**
     * A this state the purchases order has been locked in,
     * ie the order has been sent out.
     *
     * No further edit can be done to the purchases order and this point.
     * A delivery date is set for the purchase order at this point. An
     */
    ACCEPTED: "accepted",

    /**
     * A this state the devices are in the process of being accepted,
     * ie devices are delivered and being transferred for accepted.
     *
     */
    ORDER_RECEIVED: "order_received",

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
}
