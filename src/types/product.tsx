export type Description = {
  text: string;
  plain_text: string;
  date_created: string;
  last_updated: string;
}

export type Picture = {
  id: string;
  url: string;
  size: string;
  quality: string;
  max_size: string;
  secure_url: string;
}
export type Product = {
	id: string;
	site_id: string;
	title: string;
	subtitle: string;
	seller_id: string;
	category_id: string;
	official_store_id: string;
	price: string;
	base_price: string;
	original_price: string;
	currency_id: string;
	initial_quantity: string;
	available_quantity: string;
	sold_quantity: string;
	sale_terms: SalesTerms[];
	buying_mode: string;
	listing_type_id: string;
	start_time: string;
	stop_time: string;
	condition: string;
	permalink: string;
	thumbnail_id: string;
	thumbnail: string;
	secure_thumbnail: string;
	status: string;
	warranty: string;
	catalog_product_id: string;
	domain_id: string;
	health: string;
	pictures: Picture[];
	description: Description;
	created_at: string;
	updated_at: string;
}

export type SalesTerms_valueStruct = {
	number: string;
	unit: string;
}

export type SalesTerms_values = {
	id: string;
	name: string;
	struct: SalesTerms_valueStruct[];
}

export type SalesTerms = {
	id: string;
	name: string;
	value_id: string;
	value_name: string;
	value_struct: SalesTerms_valueStruct[];
	values: SalesTerms_values[];
}

export enum Sizes {
	Slim='xs',
    Small='sm',
	Medium='md',
	Large='lg',
	ExtraLarge='xl',
	Total='full'
}

export interface Profile {
  id_social: string;
  provider: string;
  nickname: string;
  name: string;
  email: string;
  token: string;
  avatar_url: string;
  client_id:string;
  client_secret:string;
  created_at: string;
  updated_at: string
}