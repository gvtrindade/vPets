CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

CREATE TABLE "user" (
	-- User's id
	id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	-- User's name
	username VARCHAR NOT NULL UNIQUE,
	-- User's password
	password VARCHAR NOT NULL,
	-- User's email
	email VARCHAR NOT NULL UNIQUE,
	-- State of user's account
	is_deleted BOOLEAN NOT NULL DEFAULT false,
	-- User's number of coins
	coins INTEGER NOT NULL DEFAULT 0,
	-- User's account creation date
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	is_admin BOOLEAN NOT NULL DEFAULT false,
	is_validated BOOLEAN NOT NULL DEFAULT false
);
COMMENT ON COLUMN "user".id IS 'User''s id';
COMMENT ON COLUMN "user".username IS 'User''s name';
COMMENT ON COLUMN "user".password IS 'User''s password';
COMMENT ON COLUMN "user".email IS 'User''s email';
COMMENT ON COLUMN "user".is_deleted IS 'State of user''s account';
COMMENT ON COLUMN "user".coins IS 'User''s number of coins';
COMMENT ON COLUMN "user".created_at IS 'User''s account creation date';
COMMENT ON COLUMN "user".is_admin IS 'User''s admin status';
COMMENT ON COLUMN "user".is_validated IS 'User''s validation status';


CREATE TABLE user_token (
	id SERIAL NOT NULL PRIMARY KEY,
	user_id UUID NOT NULL,
	-- Token for user
	token UUID NOT NULL
)


CREATE TABLE pet_type (
	-- Pet's ID
	id SERIAL NOT NULL PRIMARY KEY,
	-- Pet's type name
	name VARCHAR NOT NULL
);
COMMENT ON COLUMN pet_type.id IS 'Pet''s ID';
COMMENT ON COLUMN pet_type.name IS 'Pet''s type name';


CREATE TABLE pet (
	-- Pet's ID
	id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	-- Pet's name given by a user
	name VARCHAR NOT NULL UNIQUE,
	-- Pet's current health points
	hp INTEGER NOT NULL DEFAULT 10,
	-- Pet's max health points
	max_hp INTEGER NOT NULL DEFAULT 10,
	-- Pet's intelligence
	intelligence INTEGER NOT NULL DEFAULT 1,
	-- Pet's hunger points
	hunger INTEGER NOT NULL DEFAULT 10,
	-- Pet's appearance, like color, equipped accessories, etc.
	appearance JSON NOT NULL,
	-- Pet's type
	pet_type_id INTEGER NOT NULL
);
COMMENT ON COLUMN pet.id IS 'Pet''s ID';
COMMENT ON COLUMN pet.name IS 'Pet''s name given by a user';
COMMENT ON COLUMN pet.hp IS 'Pet''s current health points';
COMMENT ON COLUMN pet.max_hp IS 'Pet''s max health points';
COMMENT ON COLUMN pet.intelligence IS 'Pet''s intelligence';
COMMENT ON COLUMN pet.hunger IS 'Pet''s hunger points';
COMMENT ON COLUMN pet.appearance IS 'Pet''s appearance, like color, equipped accessories, etc.';
COMMENT ON COLUMN pet.pet_type_id IS 'Pet''s type';


CREATE TABLE user_pet (
	id SERIAL NOT NULL PRIMARY KEY,
	user_id UUID NOT NULL,
	pet_id UUID NOT NULL
);


CREATE TABLE npc (
	id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	-- NPC's name
	name VARCHAR NOT NULL,
	-- NPC's unique tag
	tag VARCHAR NOT NULL UNIQUE
);
COMMENT ON COLUMN npc.name IS 'NPC''s name';
COMMENT ON COLUMN npc.tag IS 'NPC''s unique tag';


CREATE TABLE item (
	id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	-- Item's internal tag
	tag VARCHAR NOT NULL,
	-- Item's image url from storage
	img_url VARCHAR NOT NULL,
	-- Item's status effects eg. health +10
	status_effect VARCHAR ARRAY NOT NULL
);
COMMENT ON COLUMN item.tag IS 'Item''s internal tag';
COMMENT ON COLUMN item.img_url IS 'Item''s image url from storage';
COMMENT ON COLUMN item.status_effect IS 'Item''s status effects eg. "health +10"';


CREATE TABLE user_item (
	id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	user_id UUID NOT NULL,
	item_id UUID NOT NULL,
	-- Location of item, inventory or storage
	is_stored BOOLEAN NOT NULL DEFAULT false
);
COMMENT ON COLUMN user_item.is_stored IS 'Location of item, inventory or storage';


CREATE TABLE npc_item (
	id SERIAL NOT NULL PRIMARY KEY,
	item_id UUID NOT NULL,
	npc_id UUID NOT NULL,
	-- Item's base value in coins, will fluctuate when shown to user
	base_value INTEGER NOT NULL,
	-- Current quantity of items, will be reset every half hour
	quantity INTEGER NOT NULL DEFAULT 5,
	last_update TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON COLUMN npc_item.base_value IS 'Item''s base value in coins, will fluctuate when shown to user';
COMMENT ON COLUMN npc_item.quantity IS 'Current quantity of items, will be reset every half hour';


CREATE TABLE game (
	id SERIAL NOT NULL PRIMARY KEY,
	-- Name of the game to be shown in the URL
	tag VARCHAR NOT NULL UNIQUE,
	-- Location of the game to be loaded for the user
	url VARCHAR NOT NULL UNIQUE
);
COMMENT ON COLUMN game.tag IS 'Name of the game to be shown in the URL';
COMMENT ON COLUMN game.url IS 'Location of the game to be loaded for the user';


-- ADD CONTRAINTS --
ALTER TABLE user_token
ADD CONSTRAINT fk_user_user_token FOREIGN KEY(user_id) REFERENCES "user"(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE pet
ADD CONSTRAINT fk_pet_pet_type FOREIGN KEY(pet_type_id) REFERENCES pet_type (id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE user_pet
ADD CONSTRAINT fk_user_id_pet FOREIGN KEY(user_id) REFERENCES "user"(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE user_pet
ADD CONSTRAINT fk_user_pet_id FOREIGN KEY(pet_id) REFERENCES pet(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE user_item
ADD CONSTRAINT fk_user_id_item FOREIGN KEY(user_id) REFERENCES "user"(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE user_item
ADD CONSTRAINT fk_user_item_id FOREIGN KEY(item_id) REFERENCES item(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE npc_item
ADD CONSTRAINT fk_npc_id_item FOREIGN KEY(npc_id) REFERENCES npc(id)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE npc_item
ADD CONSTRAINT fk_npc_item_id FOREIGN KEY(item_id) REFERENCES item(id)
ON UPDATE CASCADE ON DELETE CASCADE;
