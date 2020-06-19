

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
