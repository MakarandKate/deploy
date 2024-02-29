"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkWhatsapp = void 0;
class BulkWhatsapp {
    static getTemplateVarsById(templateId) {
        var _a;
        let templates = this.templates.filter(template => (template === null || template === void 0 ? void 0 : template.templateId) == templateId);
        if (templates === null || templates === void 0 ? void 0 : templates.length) {
            return (_a = templates[0]) === null || _a === void 0 ? void 0 : _a.variables;
        }
        return [];
    }
    static getTemplateMessageBodyById(templateId) {
        var _a;
        let templates = this.templates.filter(template => (template === null || template === void 0 ? void 0 : template.templateId) == templateId);
        if (templates === null || templates === void 0 ? void 0 : templates.length) {
            return (_a = templates[0]) === null || _a === void 0 ? void 0 : _a.msgBody;
        }
        return '';
    }
}
exports.BulkWhatsapp = BulkWhatsapp;
BulkWhatsapp.templates = [
    {
        templateId: `diwali_offer`,
        msgBody: `Hi PARTY_NAME
you are invited to BUSINESS_NAME for grand diwali dhamaka offer get CUSTOM_OFFER Off
contact us on - CONTACT_PERSON_PHONE`,
        variables: [
            {
                key: `PARTY_NAME`,
                value: `party.name`
            },
            {
                key: `BUSINESS_NAME`,
                value: `profile.legalName`
            },
            {
                key: `CONTACT_PERSON_PHONE`,
                value: `profile.contactPersonPhone`
            },
            {
                key: `CUSTOM_OFFER`,
                value: `custom.offer`
            },
        ]
    },
    {
        templateId: `stock_end`,
        msgBody: `Hi PARTY_NAME
            Hurry up stock ends CUSTOM_DAY.
            Avail CUSTOM_PERCENTAGE % spot discount.
            `,
        variables: [
            {
                key: `PARTY_NAME`,
                value: `party.name`
            },
            {
                key: `CUSTOM_DAY`,
                value: `custom.day`
            },
            {
                key: `CUSTOM_PERCENTAGE`,
                value: `custom.percentage`
            },
        ]
    },
    {
        templateId: `festive_campaign`,
        msgBody: `BUSINESS_NAME
            Celebrating CUSTOM_FESTIVAL till CUSTOM_DATE CUSTOM_MONTH.
            Avail heavy discount on ITEM_NAME.
            Book your table now.
            `,
        variables: [
            {
                key: `PARTY_NAME`,
                value: `party.name`
            },
            {
                key: `BUSINESS_NAME`,
                value: `profile.legalName`
            },
            {
                key: `CUSTOM_FESTIVAL`,
                value: `custom.festival`
            },
            {
                key: `CUSTOM_DATE`,
                value: `custom.date`
            },
            {
                key: `CUSTOM_MONTH`,
                value: `custom.month`
            },
            {
                key: `ITEM_NAME`,
                value: `item.itemName`
            },
        ]
    },
];
//# sourceMappingURL=BulkWhatsapp.js.map