
/**
 * This file was @generated using typed-pocketbase
 */

// https://pocketbase.io/docs/collections/#base-collection
export interface BaseCollectionResponse {
	/**
	 * 15 characters string to store as record ID.
	 */
	id: string;
	/**
	 * Date string representation for the creation date.
	 */
	created: string;
	/**
	 * Date string representation for the creation date.
	 */
	updated: string;
	/**
	 * The collection id.
	 */
	collectionId: string;
	/**
	 * The collection name.
	 */
	collectionName: string;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface BaseCollectionCreate {
	/**
	 * 15 characters string to store as record ID.
	 * If not set, it will be auto generated.
	 */
	id?: string;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface BaseCollectionUpdate {}

// https://pocketbase.io/docs/collections/#auth-collection
export interface AuthCollectionResponse extends BaseCollectionResponse {
	/**
	 * The username of the auth record.
	 */
	username: string;
	/**
	 * Auth record email address.
	 */
	email: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility: boolean;
	/**
	 * Indicates whether the auth record is verified or not.
	 */
	verified: boolean;
}

// https://pocketbase.io/docs/api-records/#create-record
export interface AuthCollectionCreate extends BaseCollectionCreate {
	/**
	 * The username of the auth record.
	 * If not set, it will be auto generated.
	 */
	username?: string;
	/**
	 * Auth record email address.
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Auth record password.
	 */
	password: string;
	/**
	 * Auth record password confirmation.
	 */
	passwordConfirm: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/api-records/#update-record
export interface AuthCollectionUpdate {
	/**
	 * The username of the auth record.
	 */
	username?: string;
	/**
	 * The auth record email address.
	 * This field can be updated only by admins or auth records with "Manage" access.
	 * Regular accounts can update their email by calling "Request email change".
	 */
	email?: string;
	/**
	 * Whether to show/hide the auth record email when fetching the record data.
	 */
	emailVisibility?: boolean;
	/**
	 * Old auth record password.
	 * This field is required only when changing the record password. Admins and auth records with "Manage" access can skip this field.
	 */
	oldPassword?: string;
	/**
	 * New auth record password.
	 */
	password?: string;
	/**
	 * New auth record password confirmation.
	 */
	passwordConfirm?: string;
	/**
	 * Indicates whether the auth record is verified or not.
	 * This field can be set only by admins or auth records with "Manage" access.
	 */
	verified?: boolean;
}

// https://pocketbase.io/docs/collections/#view-collection
export interface ViewCollectionRecord {
	id: string;
}

// utilities

type MaybeArray<T> = T | T[];
// ==== start of property_shops block =====


export interface PropertyShopsResponse extends BaseCollectionResponse {
	collectionName: 'property_shops';
	shop_number: string;
	tenant: string;
	utils: '' | 'elec' | 'water' | 'both' | 'none';
	order: number;
	is_vacant: boolean;
}

export interface PropertyShopsCreate extends BaseCollectionCreate {
	shop_number: string;
	tenant: string;
	utils?: '' | 'elec' | 'water' | 'both' | 'none';
	order?: number;
	is_vacant?: boolean;
}

export interface PropertyShopsUpdate extends BaseCollectionUpdate {
	shop_number?: string;
	tenant?: string;
	utils?: '' | 'elec' | 'water' | 'both' | 'none';
	order?: number;
	'order+'?: number;
	'order-'?: number;
	is_vacant?: boolean;
}

export interface PropertyShopsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_shops';
	response: PropertyShopsResponse;
	create: PropertyShopsCreate;
	update: PropertyShopsUpdate;
	relations: {
		tenant: PropertyTenantsListCollection;
		'property_bills(shop)': PropertyBillsCollection[];
	};
}

// ==== end of property_shops block =====

// ==== start of property_bills block =====


export interface PropertyBillsResponse extends BaseCollectionResponse {
	collectionName: 'property_bills';
	shop: string;
	elec_readings: number;
	water_readings: number;
	month: number;
	year: number;
}

export interface PropertyBillsCreate extends BaseCollectionCreate {
	shop: string;
	elec_readings?: number;
	water_readings?: number;
	month: number;
	year: number;
}

export interface PropertyBillsUpdate extends BaseCollectionUpdate {
	shop?: string;
	elec_readings?: number;
	'elec_readings+'?: number;
	'elec_readings-'?: number;
	water_readings?: number;
	'water_readings+'?: number;
	'water_readings-'?: number;
	month?: number;
	'month+'?: number;
	'month-'?: number;
	year?: number;
	'year+'?: number;
	'year-'?: number;
}

export interface PropertyBillsCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_bills';
	response: PropertyBillsResponse;
	create: PropertyBillsCreate;
	update: PropertyBillsUpdate;
	relations: {
		shop: PropertyShopsCollection;
	};
}

// ==== end of property_bills block =====

// ==== start of property_tenants_list block =====


export interface PropertyTenantsListResponse extends BaseCollectionResponse {
	collectionName: 'property_tenants_list';
	name: string;
	account: string;
}

export interface PropertyTenantsListCreate extends BaseCollectionCreate {
	name?: string;
	account?: string;
}

export interface PropertyTenantsListUpdate extends BaseCollectionUpdate {
	name?: string;
	account?: string;
}

export interface PropertyTenantsListCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_tenants_list';
	response: PropertyTenantsListResponse;
	create: PropertyTenantsListCreate;
	update: PropertyTenantsListUpdate;
	relations: {
		'property_shops(tenant)': PropertyShopsCollection[];
		account: PropertyUserCollection;
		'property_user(tenant)': PropertyUserCollection[];
	};
}

// ==== end of property_tenants_list block =====

// ==== start of property_user block =====


export interface PropertyUserResponse extends AuthCollectionResponse {
	collectionName: 'property_user';
	role: 'staff' | 'tenant' | 'user';
	pnone: string;
	avatarUrl: string;
	staff: string;
	tenant: string;
	user: string;
	verification_status: '' | 'initial' | 'pending' | 'resolved';
}

export interface PropertyUserCreate extends AuthCollectionCreate {
	role: 'staff' | 'tenant' | 'user';
	pnone?: string;
	avatarUrl?: string | URL;
	staff?: string;
	tenant?: string;
	user?: string;
	verification_status?: '' | 'initial' | 'pending' | 'resolved';
}

export interface PropertyUserUpdate extends AuthCollectionUpdate {
	role?: 'staff' | 'tenant' | 'user';
	pnone?: string;
	avatarUrl?: string | URL;
	staff?: string;
	tenant?: string;
	user?: string;
	verification_status?: '' | 'initial' | 'pending' | 'resolved';
}

export interface PropertyUserCollection {
	type: 'auth';
	collectionId: string;
	collectionName: 'property_user';
	response: PropertyUserResponse;
	create: PropertyUserCreate;
	update: PropertyUserUpdate;
	relations: {
		'property_tenants_list(account)': PropertyTenantsListCollection[];
		staff: PropertyStaffListCollection;
		tenant: PropertyTenantsListCollection;
		user: PropertyUsersListCollection;
		'property_staff_list(account)': PropertyStaffListCollection[];
		'property_users_list(account)': PropertyUsersListCollection[];
	};
}

// ==== end of property_user block =====

// ==== start of property_staff_list block =====


export interface PropertyStaffListResponse extends BaseCollectionResponse {
	collectionName: 'property_staff_list';
	name: string;
	account: string;
}

export interface PropertyStaffListCreate extends BaseCollectionCreate {
	name?: string;
	account: string;
}

export interface PropertyStaffListUpdate extends BaseCollectionUpdate {
	name?: string;
	account?: string;
}

export interface PropertyStaffListCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_staff_list';
	response: PropertyStaffListResponse;
	create: PropertyStaffListCreate;
	update: PropertyStaffListUpdate;
	relations: {
		'property_user(staff)': PropertyUserCollection[];
		account: PropertyUserCollection;
	};
}

// ==== end of property_staff_list block =====

// ==== start of property_users_list block =====


export interface PropertyUsersListResponse extends BaseCollectionResponse {
	collectionName: 'property_users_list';
	name: string;
	account: string;
}

export interface PropertyUsersListCreate extends BaseCollectionCreate {
	name?: string;
	account?: string;
}

export interface PropertyUsersListUpdate extends BaseCollectionUpdate {
	name?: string;
	account?: string;
}

export interface PropertyUsersListCollection {
	type: 'base';
	collectionId: string;
	collectionName: 'property_users_list';
	response: PropertyUsersListResponse;
	create: PropertyUsersListCreate;
	update: PropertyUsersListUpdate;
	relations: {
		'property_user(user)': PropertyUserCollection[];
		account: PropertyUserCollection;
	};
}

// ==== end of property_users_list block =====

export type Schema = {
	property_shops: PropertyShopsCollection;
	property_bills: PropertyBillsCollection;
	property_tenants_list: PropertyTenantsListCollection;
	property_user: PropertyUserCollection;
	property_staff_list: PropertyStaffListCollection;
	property_users_list: PropertyUsersListCollection;
};