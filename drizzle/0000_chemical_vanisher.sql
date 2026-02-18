CREATE TABLE "productss" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"slug" varchar(150) NOT NULL,
	"category" varchar(50) NOT NULL,
	"price" integer NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "productss_slug_unique" UNIQUE("slug")
);
