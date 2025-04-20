
export const es_res_status_ok = 1;
export const es_res_status_err = -1;
export const es_res_status_err_msg = 'Internal Server Error !';

export const url_separator = '/';
export const url_query_param_start = '?';
export const url_query_param_and = '&';
export const url_query_param_equal = '=';
export const url_query_param_comma = ',';
export const url_location = 'loc';
export const url_login_token = 'loginToken';
export const sibms_images = 'sibms-images'
export const skipLocationChange = true;
export const url_ws = 'ws';
export const apps = {
 main: 'sibms',
 cl: 'Enforcement'
};

export const services = {
 auth: 'auth-service',
 concurrency: 'concurrent-service',
 message: 'message-service',
 notification: 'notification-service',
 setup: 'setup-service',
 user: 'user-service',
 product: 'product-service'
};

export const api_version_v1 = 'v1';

export const endpoints = {
 authToken: 'oauth/token',
 login: 'sessions',
 lov: 'lov',
 messages: 'messages',
 modules: 'modules',
 notifications_root: 'connect',
 print: 'print',
 roles: 'roles',
 system_parameter: 'systemParams',
 users: 'users',
 devices: 'devices',
 banners: 'banners',
 categories: 'categories',
 products: 'products'
};

export const api_resources = {
 approvals: 'approvals',
 subApprovals : 'subApprovals',
 histories: 'histories',
 lov_designation: 'DESIGNATION',
 lov_location: 'LOCATION',
 lov_travel_doc_type: 'TRAVEL_DOC_TYPE',
 lov_section: 'SECTION',
 lov_nationality: 'NATIONALITY',
 lov_eye_color: 'EYE_COLOR',
 lov_hair_color: 'HAIR_COLOR',
 lov_complexion: 'COMPLEXION',
 lov_charge_type: 'CHARGE_TYPE',
 lov_charge: 'CHARGE',
 lov_ind_action: 'IND_ACTION',
 lov_charge_authority_type: 'CHARGE_AUTHORITY_TYPE',
 lov_charge_authority: 'CHARGE_AUTHORITY',
 lov_authority_district: 'AUTHORITY_DISTRICT',
 lov_revoke_reason: 'REVOKE_REASON',
 lov_revoke_inactive_reason: 'REVOKE_INACTIVE_REASON',
 lov_approval_reason: 'APPROVAL_REASON',
 lov_reject_reason: 'REJECT_REASON',
 lov_sl_other_docs: 'SL_OTHER_DOCUMENT',
 lov_case_application_type: 'CASE_APPLICATION_TYPE',
 lov_case_reason: 'CASE_REASON',
 lov_case_action: 'CASE_ACTION',
 lov_case_type: 'CASE_TYPE',
 lov_case_proceed_reason: 'CASE_PROCEED_REASON',
 lov_case_hold_reason: 'CASE_HOLD_REASON',
 lov_case_block_reason: 'CASE_BLOCK_REASON',
 lov_case_forward_reason: 'CASE_FORWARD_REASON',
 lov_case_detain_reason: 'CASE_DETAIN_REASON',
 fingerPrintData: 'fingerPrintData',
 subEntries: 'subEntries',
 flight_ship_schedules: 'schedules',
 scheduleView: 'scheduleView',


 system_parameter_image_file: 'image',
 system_parameter_print: 'print',

 user_profile: 'profile',
 user_profile_image: 'profileImage',
 user_roles: 'roles',

 concurrent_lock_is_lock: 'isLock',

 cl_ind_entry_facial_data: 'facialData',
 cl_ind_entry_finger_print_data: 'fingerPrintData',
 cl_ind_entry_iris_data: 'irisData',
 cl_ind_entry_documents: 'documents',
 cl_ind_sub_entry_id: 'clSubId',
 cl_ind_sub_entry_images: 'subEntryImages',
 cl_ind_sub_entry_documents: 'subEntryDocuments',
 property: 'property',

 lite: 'lite',
 liteCount:'liteCount',
 documentScanning: 'documentScanning',
 multiDocScanning: 'multiDocScanning',
 localCountry: 'localCountry',
 tdType: 'tdType',
 approvalsLite: 'approvalsLite',
 historiesLite : 'historiesLite',
 passengerLite : 'passengerLite',
 facialData : 'facialData',
 findFacialData : 'findFacialData',
 verify : 'verify',
 oneToManyMatch: '1ToNMatch',
 passenger: 'passenger',
 icao: 'icao-verification', pendingCount: 'pendingCount'

};

export const notification_queues = {
 not_queue_admin: 'admin-notifications',

 not_queue_security: 'security-notifications',
 not_queue_user: 'user-notifications',
 not_queue_schedulers: 'scheduler-notifications',
 not_queue_system: 'system-notifications',

 not_queue_case_mgt_analyze: 'case-mgt-analyze-notifications',
 not_queue_case_mgt_authorize: 'case-mgt-authorize-notifications',

 not_cl_individual_entry: 'cl-individual-entry-notifications',
 not_cl_individual_entry_auth_reject: 'cl-individual-entry-reject-notifications',
 not_cl_document_entry: 'cl-document-entry-notifications',
 not_cl_document_entry_reject: 'cl-document-entry-reject-notifications',
};

export const response_msg_actions = {
 ok: 'OK',
 yes: 'YES',
 no: 'NO',
};

export const response_msg_types = {
 error: {
 code: 'err',
 title: 'Error',
 actions: [response_msg_actions.ok]
 },
 success: {
 code: 'succ',
 title: 'Success',
 actions: [response_msg_actions.ok]
 },
 warning: {
 code: 'warn',
 title: 'Warning',
 actions: [response_msg_actions.ok]
 },
 confirmation: {
 code: 'conf',
 title: 'Confirmation',
 actions: [response_msg_actions.yes, response_msg_actions.no]
 },
 information: {
 code: 'infor',
 title: 'Information',
 actions: [response_msg_actions.ok]
 },
};

export const status = {
 active: {code: 'ACTIVE', name: 'Active'},
 inactive: {code: 'INACTIVE', name: 'Inactive'}
};

export const homepage_product_types = {
    popular: {code: 'POPULAR', name: 'Popular'},
    moreToLove: {code: 'MORE_TO_LOVE', name: 'More to Love'},
    forYou: {code: 'FOR_YOU', name: 'For You'},
    daily: {code: 'DAILY', name: 'Daily Picks'},
    new: {code: 'NEW', name: 'New'},
    TodaysDeals: {code: 'TODAYS_DEALS', name: "Today's Deals"},
};

export const query_parameters = {
    type: {code: 'TYPE', name: 'Type', paramName: 'type'},
    offset: {code: 'OFFSET', name: 'Offset', paramName: 'offset'},
    size: {code: 'SIZE', name: 'Size', paramName: 'size'},
    status: {code: 'STATUS', name: 'Status', paramName: 'status'}
};

export const action = {
 all_applications: {code: 'ALL_APPLICATIONS', name: 'All Applications'},
 newly_added: {code: 'NEWLY_ADDED', name: 'Newly Added'},
 modified: {code: 'MODIFIED', name: 'Modified'},
 revoke: {code: 'REVOKE', name: 'Revoke'},
};

export const status_arr = [
 status.active,
 status.inactive
];


export const authorized_status = {
 request: {code: 'REQUEST', name: 'Request'},
 approve: {code: 'APPROVE', name: 'Approved'},
 pending: {code: 'PENDING', name: 'Pending'},
 reject: {code: 'REJECT', name: 'Rejected'},
 forward: {code: 'FORWARD', name: 'Forward'},
 hold: {code: 'HOLD', name: 'Hold'},
 ongoing: {code: 'ONGOING', name: 'Ongoing'},
 re_process: {code: 'RE_PROCESS', name: 'Re Process'},
 re_print: {code: 'RE_PRINT', name: 'Re Print'},
 request_hold: {code: 'REQUEST_HOLD', name: 'Request-Hold'},
 request_re_process: {code: 'REQUEST_RE_PROCESS', name: 'Request-Re Process'}
};

export const authorized_status_all_arr = [
 authorized_status.request,
 authorized_status.approve,
 authorized_status.pending,
 authorized_status.reject,
 authorized_status.forward,
 authorized_status.hold,
 authorized_status.ongoing,
 authorized_status.re_process,
 authorized_status.re_print,
 authorized_status.request_hold,
 authorized_status.request_re_process,
];

export const authorized_status_ind_entry_arr = [
 authorized_status.approve,
 authorized_status.pending,
 authorized_status.reject,
];


export const approval_status = {
 accept: {code: 'APPROVE', name: 'Approved'},
 reject: {code: 'REJECT', name: 'Rejected'},
 pending: {code: 'PENDING', name: 'Pending'}
};

export const position_types = {
    top: {code: 'TOP', name: 'Top'},
    middle: {code: 'MIDDLE', name: 'MIDDLE'},
    topMiddle: {code: 'TOP_MIDDLE', name: 'Top Middle'}
};

export const approval_status_arr = [
 approval_status.accept,
 approval_status.reject,
 approval_status.pending,
];

export const gender = {
 male: {code: 'MALE', name: 'Male'},
 female: {code: 'FEMALE', name: 'Female'},
 unknown: {code: 'UNKNOWN', name: 'Unknown'}
};

export const gender_arr = [
 gender.male,
 gender.female,
 gender.unknown
];

export const field_access_level = {
 FULL: 'FULL',
 VIEW_ONLY: 'VIEW_ONLY',
 RESTRICTED: 'RESTRICTED'
};

export const role_types = {
 role_type_admin: {code: 'ADMIN', name: 'Administrator'},
 role_type_sys_user: {code: 'SYS_USER', name: 'System User'},
};

export const ui_mode = {
 insert: {code: 'INSERT'},
 update: {code: 'UPDATE'},
 view: {code: 'VIEW'},
};

export const height_units = {
 cm: {code: 'CM', name: 'cm'},
 inch: {code: 'INCHES', name: 'inch'},
};

export const height_units_arr = [
 height_units.cm,
 height_units.inch
];
// Message Types
export const msg_types = {
 system_usr_force_logout: 'MESSAGE_SYSTEM_USER_FORCE_LOGOUT',
 cl_property_cache: {code: 'MESSAGE_PROPERTY_CACHE_CL'}
};

export const alert = {
 INFO: 'INFO',
 WARNING: 'WARNING',
 DANGER: 'DANGER',
 SUCCESS: 'SUCCESS',
 PRIMARY: 'PRIMARY',
 LEFT: 'LEFT',
 RIGHT: 'RIGHT',
 TOP: 'TOP',
 BOTTOM: 'BOTTOM'
};

export const DATE_FORMAT = {
 parse: {
 dateInput: 'DD/MM/YYYY',
 },
 display: {
 dateInput: 'DD/MM/YYYY',
 monthYearLabel: 'MM YYYY',
 dateAllyLabel: 'DD/MM/YYYY',
 monthYearAllyLabel: 'MM YYYY',
 },

};

// export const doc_types = {
// ordinary_passport: {code: 'ORDINARY_PASSPORT', name: 'Ordinary Passport'},
// diplomatic_passport: {code: 'DIPLOMATIC_PASSPORT', name: 'Diplomatic Passport'},
// official_passport: {code: 'OFFICIAL_PASSPORT', name: 'Official Passport'},
// un_passport: {code: 'UN_PASSPORT', name: 'UN Passport'},
// ship_card: {code: 'SHIP_CARD', name: 'Ship Card'},
// arr_dep_card: {code: 'ARR_DEP_CARD', name: 'Arr / Dep Card'},
// id_card : {code: 'ID_CARD', name: 'ID Card'}
// };
//
// export const doc_types_arr = [
// doc_types.ordinary_passport,
// doc_types.diplomatic_passport,
// doc_types.official_passport,
// doc_types.un_passport,
// doc_types.ship_card,
// doc_types.arr_dep_card,
// doc_types.id_card
// ];

export const cl_type = {
 stop_list: {code: 'STOP_LIST', name: 'Stop List'},
 watch_list: {code: 'WATCH_LIST', name: 'Watch List'}
};

export const cl_type_arr = [
 cl_type.stop_list,
 cl_type.watch_list
];

export const contact_types = {
 home: {code: 'HOME', name: 'Home'},
 official: {code: 'OFFICIAL', name: 'Official'},
 personal: {code: 'PERSONAL', name: 'Personal'},
 residential: {code: 'RESIDENTIAL', name: 'Residential'},
 commercial: {code: 'COMMERCIAL', name: 'Commercial'},
 mobile: {code: 'MOBILE', name: 'Mobile'},
 other: {code: 'OTHER', name: 'Other'},
};

export const contact_types_arr = [
 contact_types.home,
 contact_types.official,
 contact_types.personal,
 contact_types.residential,
 contact_types.commercial,
 contact_types.mobile,
 contact_types.other,
];

export const case_action_type = {
 finger_print: {code: 'FINGER_PRINT', name: 'Finger Print Analysis'},
 face: {code: 'FACE', name: 'Facial Analysis'},
 document: {code: 'DOCUMENT', name: 'Document Analysis'},
 record_interview: {code: 'RECORD_INTERVIEW', name: 'Record Interview'},
 tm_details: {code: 'TM_DETAILS', name: 'Travel Movement Details'},
 visa_details: {code: 'VISA_DETAILS', name: 'Visa Details'},
 td_details: {code: 'TD_DETAILS', name: 'Travel Document Details'},
 citizenship_details: {code: 'CITIZENSHIP_DETAILS', name: 'Citizenship Details'},
 cl_details: {code: 'CL_DETAILS', name: 'SL Details'},
 face_capture: {code: 'FACE_CAPTURE', name: 'Face Capture'},
 iris_capture: {code: 'IRIS_CAPTURE', name: 'Iris Capture'},
 fingerprint_capture: {code: 'FINGERPRINT_CAPTURE', name: 'Finger print Capture'},
};

export const case_action_type_arr = [
 case_action_type.finger_print,
 case_action_type.face,
 case_action_type.document,
 case_action_type.record_interview,
 case_action_type.tm_details,
 case_action_type.visa_details,
 case_action_type.td_details,
 case_action_type.citizenship_details,
 case_action_type.cl_details,
 case_action_type.face_capture,
 case_action_type.iris_capture,
 case_action_type.fingerprint_capture,
];

export const case_action_type_arr_first_col = [
 case_action_type.finger_print.code,
 case_action_type.face.code,
 case_action_type.cl_details.code,
 case_action_type.face_capture.code,
 case_action_type.iris_capture.code,
 case_action_type.fingerprint_capture.code,
];

export const case_action_type_arr_second_col = [

 case_action_type.document.code,
 case_action_type.record_interview.code,
 case_action_type.tm_details.code,
 case_action_type.visa_details.code,
 case_action_type.td_details.code,
 case_action_type.citizenship_details.code,
];

export const contact_category = {
 phone: {code: 'PHONE', name: 'Phone'},
 email: {code: 'EMAIL', name: 'Email'},
};

export const other_doc_types = {
 identity_card: {code: 'IDENTITY_CARD', name: 'Identity Card'},
 visa_doc: {code: 'VISA_DOC', name: 'Visa Document'},
 birth_certification: {code: 'BIRTH_CERTIFICATION', name: 'Birth Certification'},
 marriage_certification: {code: 'MARRIAGE_CERTIFICATION', name: 'Marriage Certification'},

};

export const other_doc_type_arr = [
 other_doc_types.identity_card,
 other_doc_types.visa_doc,
 other_doc_types.birth_certification,
 other_doc_types.marriage_certification,
];

export const other_doc_file_type = {
 jpg: {code: 'JPG', ext: 'jpg', size: 6291456},
 jpeg: {code: 'JPEG', ext: 'jpeg', size: 6291456},
 png: {code: 'PNG', ext: 'png', size: 6291456},
 pdf: {code: 'PDF', ext: 'pdf', size: 6291456},
 doc: {code: 'DOC', ext: 'doc', size: 6291456},
 docx: {code: 'DOCX', ext: 'docx', size: 6291456},
};

export const other_doc_file_type_ext_arr = [
 other_doc_file_type.jpg.ext,
 other_doc_file_type.jpeg.ext,
 other_doc_file_type.png.ext,
];

export const other_doc_file_type_ext_all_arr = [
 other_doc_file_type.jpg.ext,
 other_doc_file_type.jpeg.ext,
 other_doc_file_type.png.ext,
 other_doc_file_type.pdf.ext,
 other_doc_file_type.doc.ext,
 other_doc_file_type.docx.ext,
];

export const scanner_use_pages = {
 inquirySearch: 'inquirySearch',
 dashCLEntrySearch: 'dashCLEntrySearch',

};

export const report_operation = {
 generate: {code: 'GENERATE'}
};

export const report_format = {
 pdf: {code: 'PDF'},
 excel: {code: 'EXCEL'},
};

export const case_status = {
 init: {code: 'INIT', name: 'Init'},
 proceed: {code: 'PROCEED', name: 'Proceed'},
 hold: {code: 'HOLD', name: 'Hold'},
 block: {code: 'BLOCK', name: 'Block'},
 forward: {code: 'FORWARD', name: 'Forward'},
 detain: {code: 'DETAIN', name: 'Detained'}
};

export const case_status_arr = [
 case_status.init,
 case_status.proceed,
 case_status.hold,
 case_status.block,
 case_status.forward,
 case_status.detain,
];

export const case_analyze_status_arr = [
 case_status.proceed,
 case_status.hold,
 case_status.block,
 case_status.forward,
];

export const case_authorize_status_arr = [
 case_status.proceed,
 case_status.hold,
 case_status.block,
 case_status.detain
];

// below constant onlye create for frontend only
export const save_type_format = {
 new: {code: 'NEW'},
 edit: {code: 'EDIT'},
 remove: {code: 'REMOVE'},
 no_change: {code: 'NO_CHANGE'},
};
// end

export const case_action_status = {
 not_applicable: {code: 'NA', name: 'N/A'},
 done: {code: 'DONE', name: 'Done'},
 not_done: {code: 'NOT_DONE', name: 'Not Done'}
};

export const answer_type = {
 yes: {code: 'YES', name: 'YES'},
 no: {code: 'NO', name: 'NO'}
};
export const answer_type_arr = [
 answer_type.yes,
 answer_type.no
];

export const case_interview_file_type = {
 pdf: {code: 'PDF', ext: 'pdf', size: 6291456},
 mp3: {code: 'MP3', ext: 'mp3', size: 6291456},
 jpg: {code: 'JPG', ext: 'jpg', size: 6291456},
 png: {code: 'PNG', ext: 'png', size: 6291456},
 doc: {code: 'DOC', ext: 'doc', size: 6291456},
 mp4: {code: 'MP4', ext: 'mp4', size: 6291456},
 docx: {code: 'DOCX', ext: 'docx', size: 6291456},
};

export const case_interview_file_type_arr = [
 case_interview_file_type.pdf.ext,
 case_interview_file_type.mp3.ext,
 case_interview_file_type.jpg.ext,
 case_interview_file_type.png.ext,
 case_interview_file_type.doc.ext,
 case_interview_file_type.mp4.ext,
 case_interview_file_type.docx.ext,
];

export const case_interview_preview_file_type_arr = [
 case_interview_file_type.pdf.ext,
 case_interview_file_type.jpg.ext,
 case_interview_file_type.png.ext,
 case_interview_file_type.doc.ext,
 case_interview_file_type.docx.ext,
];

export const question_type = {
 default: {code: 'DEFAULT', name: 'Default'},
 border_referral: {code: 'BDR_REFERRAL', name: 'Border Referral'},
 case_mgt: {code: 'CASE_MGT', name: 'Case Management'},
};

export const passenger_types = {
 local: {code: 'LOCAL', name: 'Local'},
 foreigner: {code: 'FOREIGNER', name: 'Foreigner'},
};

export const user_types = {
 counter_user: 'COUNTER_USER',
 arr_counter_user: 'ARR_COUNTER_USER',
 dep_counter_user: 'DEP_COUNTER_USER',
};

export const entry_groups = {
 individuals: 'INDIVIDUALS',
 modified: 'MODIFIED',
 revoke: 'REVOKE',
 documents: 'DOCUMENTS',
};

export const case_request_type = {
 analyzer: 'ANALYZER',
 authorizer: 'AUTHORIZER',
 analyzer_all: 'ANALYZER_ALL',
 authorizer_all: 'AUTHORIZER_ALL'
};

export const case_stat_request_type = {
 current: 'CURRENT',
 previous: 'PREVIOUS',
};

export const message_group = {
 message_case_mgt: 'MESSAGE_CASE_MGT',
 message_cl_document_entry: 'MESSAGE_CL_DOCUMENT_ENTRY'
};

export const message_type = {
 msg_case_mgt_analyze: 'MSG_CASE_MGT_ANALYZE',
 msg_case_mgt_authorize: 'MSG_CASE_MGT_AUTHORIZE',
 msg_cl_doc_auth_reject: 'MSG_CL_DOC_AUTH_REJECT',
 msg_cl_doc_entry: 'MSG_CL_DOC_ENTRY',
 msg_cl_doc_modify: 'MSG_CL_DOC_MODIFY',
};

export const report_type = {
 summary: {code: 'SUMMARY', name: 'Summary'},
 detail: {code: 'DETAIL', name: 'Detail'}
};

export const case_mgt_report_type_arr = [
 report_type.summary,
 report_type.detail
];

export const ind_stat_rpt_type = {
 cl_type: {code: 'NAT_CLTYPE', name: 'Nationality/SL Type'},
 charge: {code: 'NAT_CHARGE', name: 'Nationality/Charge'}
};

export const ind_stat_rpt_type_arr = [
 ind_stat_rpt_type.cl_type,
 ind_stat_rpt_type.charge
];

export const audit_log_rpt_type = {
 individual: {code: 'INDIVIDUAL', name: 'Individual'},
 document: {code: 'DOCUMENT', name: 'Document'}
};

export const audit_log_rpt_type_arr = [
 audit_log_rpt_type.individual,
 audit_log_rpt_type.document
];

export const cl_user_type = {
 clEntryUser: 'CL_ENTRY_USER',
 clAuthUser: 'CL_AUTH_USER'
};

export const data_types = {
 string: {code: 'STRING', name: 'String'},
 number: {code: 'NUMBER', name: 'Number'},
 boolean: {code: 'BOOLEAN', name: 'Boolean'},
 date: {code: 'DATE', name: 'Date'},
 image: {code: 'IMAGE', name: 'Image'}
};

export const boolean_types = {
 true: {code: 'TRUE', name: 'True'},
 false: {code: 'FALSE', name: 'False'},
};

export const messageProperties = {
 code: 'PROP_CACHE_CODE',
 value: 'PROP_CACHE_VALUE',
 dataType: 'PROP_CACHE_DATA_TYPE',
};

export const module_types = {
 cl: 'CONTRO_LIST',
 border: 'BORDER',
 mod_type_visa: 'VISA',
 mod_type_travel_docx: 'TRAVEL_DOC'
};

export const mod_types = {
 // @ts-ignore
 mod_type_enforcement: {code: 'Enforcement', name: 'Enforcement', parent: null},
};

export const fileUploadOperation = {
 choose: 'CHOOSE',
 scan: 'SCAN'
};

export const file_types = {
 jpg: {code: 'JPG', ext: 'jpg', size: 6291456},
 jpeg: {code: 'JPEG', ext: 'jpeg', size: 6291456},
 png: {code: 'PNG', ext: 'png', size: 6291456},
 pdf: {code: 'PDF', ext: 'pdf', size: 6291456},
 doc: {code: 'DOC', ext: 'doc', size: 6291456},
 docx: {code: 'DOCX', ext: 'docx', size: 6291456},
};

export const file_types_images_ext_arr = [
 file_types.jpg.ext,
 file_types.jpeg.ext,
 file_types.png.ext,
];

export const cl_app_doc_scan_types_arr = [
 file_types.jpeg.ext,
 file_types.jpg.ext,
 file_types.png.ext,
 file_types.pdf.ext
];


export const lock_entity_type = {
 entity_type_cl_entry: 'CL_ENTRY',
 cl_entry_authorize : 'CL_ENTRY_AUTH'
};

export const case_module_types = {
 border: {code: 'MOD_002', name: 'Border Control'},
 travel_doc: {code: 'MOD_006', name: 'Travel Document'},
 risk_asmt: {code: 'RAE', name: 'Traveller Assessment'},
};