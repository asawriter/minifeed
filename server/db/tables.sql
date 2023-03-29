
-- USER TABLE 
CREATE TABLE IF NOT EXISTS users (
    id varchar(200) not null,
    name varchar(200) not null,
    email varchar(200) not null,
    password varchar(200) not null,
    bio varchar(200),
    avatar varchar(200),
    created_at timestamp default current_timestamp,
    constraint pk_id_users primary key (id),
    constraint ck_email unique (email)
);

-- FEED TABLE
CREATE TABLE IF NOT EXISTS feeds (
    id varchar(200) not null,
    title varchar(200) not null,
    content text not null,
    image varchar(200),
    author varchar(200) not null, 
    created_at timestamp default current_timestamp,
    saved boolean default false,
    constraint pk_id_feeds primary key (id),
    constraint fk_user_feeds foreign key (author) references users (id)
);

-- COMMENT TABLE
CREATE TABLE IF NOT EXISTS comments (
    id varchar(200) not null,
    content text not null,
    author varchar(200) not null,
    parentFeed varchar(200) not null,
    parentId varchar(200),  
    created_at timestamp default current_timestamp,
    constraint pk_id_comments primary key (id),
    constraint fk_user_comments foreign key (author) references users (id),
    constraint fk_feed_comments foreign key (parentFeed) references feeds (id)
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

-- FRIEND TABLE
CREATE TABLE IF NOT EXISTS friends (
    id varchar(200) not null,
    followed varchar(200) not null,
    follower varchar(200) not null, 
    constraint pk_id_friends primary key (id),
    constraint fk_user_friends foreign key (followed) references users (id),
    constraint fk_feed_friends foreign key (follower) references users (id)
);
 