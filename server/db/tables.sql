
-- USER TABLE 
CREATE TABLE IF NOT EXISTS users (
    id varchar(200) not null,
    email varchar(200) not null,
    username varchar(200) not null,
    password varchar(200) not null,
    profilePic varchar(200) default ("default_avatar.png"),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint pk_id_users primary key (id),
    constraint ck_username unique (username),
    constraint ck_email unique (email)
);

-- FEED TABLE
CREATE TABLE IF NOT EXISTS feeds (
    id varchar(200) not null,
    content text not null,
    userId varchar(200) not null, 
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    saved boolean default false,
    constraint pk_id_feeds primary key (id),
    constraint fk_user_feeds foreign key (userId) references users (id)
);

-- COMMENT TABLE
CREATE TABLE IF NOT EXISTS comments (
    id varchar(200) not null,
    message text not null,
    userId varchar(200) not null,
    feedId varchar(200) not null, 
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint pk_id_comments primary key (id),
    constraint fk_user_comments foreign key (userId) references users (id),
    constraint fk_feed_comments foreign key (feedId) references feeds (id)
);

-- LIKE TABLE
CREATE TABLE IF NOT EXISTS likes (
    id varchar(200) not null,
    userLiked varchar(200) not null,
    feedLiked varchar(200) not null, 
    constraint pk_id_likes primary key (id),
    constraint fk_user_likes foreign key (userLiked) references users (id),
    constraint fk_feed_likes foreign key (feedLiked) references feeds (id)
);
 