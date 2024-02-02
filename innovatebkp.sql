PGDMP                         {            innovaterw_prod_db    12.16    15.2 �    I           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            J           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            K           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            L           1262    26380    innovaterw_prod_db    DATABASE     ~   CREATE DATABASE innovaterw_prod_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
 "   DROP DATABASE innovaterw_prod_db;
                doadmin    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            M           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    6            �            1259    26928 
   Activities    TABLE     �   CREATE TABLE public."Activities" (
    id integer NOT NULL,
    "userId" integer,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    category character varying(255)
);
     DROP TABLE public."Activities";
       public         heap    innovaterwdbuser    false    6            �            1259    26728    ActivitiesOfCompanies    TABLE     �   CREATE TABLE public."ActivitiesOfCompanies" (
    "companyId" integer NOT NULL,
    "activityId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 +   DROP TABLE public."ActivitiesOfCompanies";
       public         heap    innovaterwdbuser    false    6            �            1259    26926    Activities_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Activities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Activities_id_seq";
       public          innovaterwdbuser    false    239    6            N           0    0    Activities_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Activities_id_seq" OWNED BY public."Activities".id;
          public          innovaterwdbuser    false    238            �            1259    26743    AudienceForPosts    TABLE       CREATE TABLE public."AudienceForPosts" (
    "typeOfPost" character varying(255) NOT NULL,
    "postId" integer NOT NULL,
    "activityId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 &   DROP TABLE public."AudienceForPosts";
       public         heap    innovaterwdbuser    false    6            �            1259    26528    Blogs    TABLE     �  CREATE TABLE public."Blogs" (
    id integer NOT NULL,
    title character varying(255),
    content text NOT NULL,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    category character varying(255) NOT NULL,
    author integer,
    image character varying(255),
    "companyId" integer,
    messages text[]
);
    DROP TABLE public."Blogs";
       public         heap    innovaterwdbuser    false    6            �            1259    26526    Blogs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Blogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Blogs_id_seq";
       public          innovaterwdbuser    false    6    209            O           0    0    Blogs_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Blogs_id_seq" OWNED BY public."Blogs".id;
          public          innovaterwdbuser    false    208            �            1259    26630    BusinessActivities    TABLE     �   CREATE TABLE public."BusinessActivities" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 (   DROP TABLE public."BusinessActivities";
       public         heap    innovaterwdbuser    false    6            �            1259    26628    BusinessActivities_id_seq    SEQUENCE     �   CREATE SEQUENCE public."BusinessActivities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."BusinessActivities_id_seq";
       public          innovaterwdbuser    false    6    219            P           0    0    BusinessActivities_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."BusinessActivities_id_seq" OWNED BY public."BusinessActivities".id;
          public          innovaterwdbuser    false    218            �            1259    26517 	   Companies    TABLE     �  CREATE TABLE public."Companies" (
    id integer NOT NULL,
    "coName" character varying(255) NOT NULL,
    "coType" character varying(255),
    "coWebsite" character varying(255),
    "districtBasedIn" character varying(255),
    "shortDescription" text,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    logo character varying(255),
    "yearFounded" integer,
    "contactEmail" text,
    "contactPhone" text,
    "customerBase" text,
    "socialMedia" text,
    "phoneDisplay" boolean,
    "emailDisplay" boolean,
    "officeAddress" character varying(255),
    slug character varying(255),
    "businessActivityId" integer,
    messages text[]
);
    DROP TABLE public."Companies";
       public         heap    innovaterwdbuser    false    6            �            1259    26515    Companies_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Companies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Companies_id_seq";
       public          innovaterwdbuser    false    6    207            Q           0    0    Companies_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Companies_id_seq" OWNED BY public."Companies".id;
          public          innovaterwdbuser    false    206            �            1259    26757    CompanyCategories    TABLE     �   CREATE TABLE public."CompanyCategories" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    image character varying(255)
);
 '   DROP TABLE public."CompanyCategories";
       public         heap    innovaterwdbuser    false    6            �            1259    26755    CompanyCategories_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CompanyCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."CompanyCategories_id_seq";
       public          innovaterwdbuser    false    225    6            R           0    0    CompanyCategories_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."CompanyCategories_id_seq" OWNED BY public."CompanyCategories".id;
          public          innovaterwdbuser    false    224            �            1259    26698    CompanyTypes    TABLE     M  CREATE TABLE public."CompanyTypes" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    description text,
    image character varying(255),
    display_order integer
);
 "   DROP TABLE public."CompanyTypes";
       public         heap    innovaterwdbuser    false    6            �            1259    26696    CompanyTypes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CompanyTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."CompanyTypes_id_seq";
       public          innovaterwdbuser    false    221    6            S           0    0    CompanyTypes_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."CompanyTypes_id_seq" OWNED BY public."CompanyTypes".id;
          public          innovaterwdbuser    false    220            �            1259    26776    DeletedCompanies    TABLE     �   CREATE TABLE public."DeletedCompanies" (
    id integer NOT NULL,
    data text,
    "recoveryToken" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 &   DROP TABLE public."DeletedCompanies";
       public         heap    innovaterwdbuser    false    6            �            1259    26774    DeletedCompanies_id_seq    SEQUENCE     �   CREATE SEQUENCE public."DeletedCompanies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."DeletedCompanies_id_seq";
       public          innovaterwdbuser    false    6    229            T           0    0    DeletedCompanies_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."DeletedCompanies_id_seq" OWNED BY public."DeletedCompanies".id;
          public          innovaterwdbuser    false    228            �            1259    26539    Events    TABLE     �  CREATE TABLE public."Events" (
    id integer NOT NULL,
    title character varying(255),
    description text NOT NULL,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    category character varying(255) NOT NULL,
    flyer character varying(255),
    "eventDate" timestamp with time zone,
    "eventTime" time without time zone,
    author integer,
    "companyId" integer,
    messages text[]
);
    DROP TABLE public."Events";
       public         heap    innovaterwdbuser    false    6            �            1259    26787    EventsTypes    TABLE     �   CREATE TABLE public."EventsTypes" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."EventsTypes";
       public         heap    innovaterwdbuser    false    6            �            1259    26785    EventsTypes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."EventsTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."EventsTypes_id_seq";
       public          innovaterwdbuser    false    231    6            U           0    0    EventsTypes_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."EventsTypes_id_seq" OWNED BY public."EventsTypes".id;
          public          innovaterwdbuser    false    230            �            1259    26537    Events_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Events_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Events_id_seq";
       public          innovaterwdbuser    false    211    6            V           0    0    Events_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Events_id_seq" OWNED BY public."Events".id;
          public          innovaterwdbuser    false    210            �            1259    26892    Individuals    TABLE     �  CREATE TABLE public."Individuals" (
    id integer NOT NULL,
    "lastName" character varying(255),
    "firstName" character varying(255),
    "accType" character varying(255),
    "shortDescription" text,
    picture character varying(255),
    location character varying(255),
    portfolio character varying(255),
    linkedin character varying(255),
    slug character varying(255),
    "contactEmail" character varying(255) NOT NULL,
    "contactPhone" character varying(255),
    "emailDisplay" boolean,
    "phoneDisplay" boolean,
    status character varying(255),
    user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."Individuals";
       public         heap    innovaterwdbuser    false    6            �            1259    26890    Individuals_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Individuals_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Individuals_id_seq";
       public          innovaterwdbuser    false    237    6            W           0    0    Individuals_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Individuals_id_seq" OWNED BY public."Individuals".id;
          public          innovaterwdbuser    false    236            �            1259    26550    Jobs    TABLE     �  CREATE TABLE public."Jobs" (
    id integer NOT NULL,
    title character varying(255),
    description text,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "companyId" integer,
    category character varying(255) NOT NULL,
    "deadlineDate" timestamp with time zone NOT NULL,
    "deadlineTime" time without time zone NOT NULL,
    "jobDetailsDocument" character varying(255),
    messages text[]
);
    DROP TABLE public."Jobs";
       public         heap    innovaterwdbuser    false    6            �            1259    26548    Jobs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Jobs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Jobs_id_seq";
       public          innovaterwdbuser    false    6    213            X           0    0    Jobs_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Jobs_id_seq" OWNED BY public."Jobs".id;
          public          innovaterwdbuser    false    212            �            1259    26619    Messages    TABLE     -  CREATE TABLE public."Messages" (
    id integer NOT NULL,
    "companyId" integer,
    email character varying(255),
    message text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    firstread timestamp with time zone,
    "userId" integer
);
    DROP TABLE public."Messages";
       public         heap    innovaterwdbuser    false    6            �            1259    26617    Messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Messages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Messages_id_seq";
       public          innovaterwdbuser    false    6    217            Y           0    0    Messages_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Messages_id_seq" OWNED BY public."Messages".id;
          public          innovaterwdbuser    false    216            �            1259    26765    Notifications    TABLE     H  CREATE TABLE public."Notifications" (
    id integer NOT NULL,
    "companyId" integer,
    subject character varying(255),
    content text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    firstread timestamp with time zone,
    "linkForMore" character varying(255)
);
 #   DROP TABLE public."Notifications";
       public         heap    innovaterwdbuser    false    6            �            1259    26763    Notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Notifications_id_seq";
       public          innovaterwdbuser    false    6    227            Z           0    0    Notifications_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Notifications_id_seq" OWNED BY public."Notifications".id;
          public          innovaterwdbuser    false    226            �            1259    26798 	   Resources    TABLE     J  CREATE TABLE public."Resources" (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    file character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Resources";
       public         heap    innovaterwdbuser    false    6            �            1259    26879    ResourcesTypes    TABLE     �   CREATE TABLE public."ResourcesTypes" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."ResourcesTypes";
       public         heap    innovaterwdbuser    false    6            �            1259    26877    ResourcesTypes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ResourcesTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."ResourcesTypes_id_seq";
       public          innovaterwdbuser    false    235    6            [           0    0    ResourcesTypes_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."ResourcesTypes_id_seq" OWNED BY public."ResourcesTypes".id;
          public          innovaterwdbuser    false    234            �            1259    26796    Resources_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Resources_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Resources_id_seq";
       public          innovaterwdbuser    false    233    6            \           0    0    Resources_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Resources_id_seq" OWNED BY public."Resources".id;
          public          innovaterwdbuser    false    232            �            1259    26494    SequelizeData    TABLE     R   CREATE TABLE public."SequelizeData" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeData";
       public         heap    innovaterwdbuser    false    6            �            1259    26499    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    innovaterwdbuser    false    6            �            1259    26561    Subscriptions    TABLE     �   CREATE TABLE public."Subscriptions" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."Subscriptions";
       public         heap    innovaterwdbuser    false    6            �            1259    26559    Subscriptions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Subscriptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Subscriptions_id_seq";
       public          innovaterwdbuser    false    215    6            ]           0    0    Subscriptions_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Subscriptions_id_seq" OWNED BY public."Subscriptions".id;
          public          innovaterwdbuser    false    214            �            1259    26973    UserMessages    TABLE       CREATE TABLE public."UserMessages" (
    id bigint NOT NULL,
    "userId" integer NOT NULL,
    "lastMessageId" integer NOT NULL,
    "unreadMessagesCount" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."UserMessages";
       public         heap    innovaterwdbuser    false    6            �            1259    26971    UserMessages_id_seq    SEQUENCE     ~   CREATE SEQUENCE public."UserMessages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."UserMessages_id_seq";
       public          innovaterwdbuser    false    6    241            ^           0    0    UserMessages_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."UserMessages_id_seq" OWNED BY public."UserMessages".id;
          public          innovaterwdbuser    false    240            �            1259    26506    Users    TABLE       CREATE TABLE public."Users" (
    id integer NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255) NOT NULL,
    "jobTitle" character varying(255),
    password character varying(255),
    role character varying(255),
    "companyId" integer,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "resetLink" character varying(255),
    "lastActivity" timestamp with time zone
);
    DROP TABLE public."Users";
       public         heap    innovaterwdbuser    false    6            �            1259    26504    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          innovaterwdbuser    false    6    205            _           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          innovaterwdbuser    false    204            U           2604    26931    Activities id    DEFAULT     r   ALTER TABLE ONLY public."Activities" ALTER COLUMN id SET DEFAULT nextval('public."Activities_id_seq"'::regclass);
 >   ALTER TABLE public."Activities" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    239    238    239            G           2604    26531    Blogs id    DEFAULT     h   ALTER TABLE ONLY public."Blogs" ALTER COLUMN id SET DEFAULT nextval('public."Blogs_id_seq"'::regclass);
 9   ALTER TABLE public."Blogs" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    209    208    209            L           2604    26633    BusinessActivities id    DEFAULT     �   ALTER TABLE ONLY public."BusinessActivities" ALTER COLUMN id SET DEFAULT nextval('public."BusinessActivities_id_seq"'::regclass);
 F   ALTER TABLE public."BusinessActivities" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    219    218    219            F           2604    26520    Companies id    DEFAULT     p   ALTER TABLE ONLY public."Companies" ALTER COLUMN id SET DEFAULT nextval('public."Companies_id_seq"'::regclass);
 =   ALTER TABLE public."Companies" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    207    206    207            N           2604    26760    CompanyCategories id    DEFAULT     �   ALTER TABLE ONLY public."CompanyCategories" ALTER COLUMN id SET DEFAULT nextval('public."CompanyCategories_id_seq"'::regclass);
 E   ALTER TABLE public."CompanyCategories" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    225    224    225            M           2604    26701    CompanyTypes id    DEFAULT     v   ALTER TABLE ONLY public."CompanyTypes" ALTER COLUMN id SET DEFAULT nextval('public."CompanyTypes_id_seq"'::regclass);
 @   ALTER TABLE public."CompanyTypes" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    221    220    221            P           2604    26779    DeletedCompanies id    DEFAULT     ~   ALTER TABLE ONLY public."DeletedCompanies" ALTER COLUMN id SET DEFAULT nextval('public."DeletedCompanies_id_seq"'::regclass);
 D   ALTER TABLE public."DeletedCompanies" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    228    229    229            H           2604    26542 	   Events id    DEFAULT     j   ALTER TABLE ONLY public."Events" ALTER COLUMN id SET DEFAULT nextval('public."Events_id_seq"'::regclass);
 :   ALTER TABLE public."Events" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    211    210    211            Q           2604    26790    EventsTypes id    DEFAULT     t   ALTER TABLE ONLY public."EventsTypes" ALTER COLUMN id SET DEFAULT nextval('public."EventsTypes_id_seq"'::regclass);
 ?   ALTER TABLE public."EventsTypes" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    231    230    231            T           2604    26895    Individuals id    DEFAULT     t   ALTER TABLE ONLY public."Individuals" ALTER COLUMN id SET DEFAULT nextval('public."Individuals_id_seq"'::regclass);
 ?   ALTER TABLE public."Individuals" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    237    236    237            I           2604    26553    Jobs id    DEFAULT     f   ALTER TABLE ONLY public."Jobs" ALTER COLUMN id SET DEFAULT nextval('public."Jobs_id_seq"'::regclass);
 8   ALTER TABLE public."Jobs" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    213    212    213            K           2604    26622    Messages id    DEFAULT     n   ALTER TABLE ONLY public."Messages" ALTER COLUMN id SET DEFAULT nextval('public."Messages_id_seq"'::regclass);
 <   ALTER TABLE public."Messages" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    217    216    217            O           2604    26768    Notifications id    DEFAULT     x   ALTER TABLE ONLY public."Notifications" ALTER COLUMN id SET DEFAULT nextval('public."Notifications_id_seq"'::regclass);
 A   ALTER TABLE public."Notifications" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    226    227    227            R           2604    26801    Resources id    DEFAULT     p   ALTER TABLE ONLY public."Resources" ALTER COLUMN id SET DEFAULT nextval('public."Resources_id_seq"'::regclass);
 =   ALTER TABLE public."Resources" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    233    232    233            S           2604    26882    ResourcesTypes id    DEFAULT     z   ALTER TABLE ONLY public."ResourcesTypes" ALTER COLUMN id SET DEFAULT nextval('public."ResourcesTypes_id_seq"'::regclass);
 B   ALTER TABLE public."ResourcesTypes" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    234    235    235            J           2604    26564    Subscriptions id    DEFAULT     x   ALTER TABLE ONLY public."Subscriptions" ALTER COLUMN id SET DEFAULT nextval('public."Subscriptions_id_seq"'::regclass);
 A   ALTER TABLE public."Subscriptions" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    214    215    215            V           2604    26976    UserMessages id    DEFAULT     v   ALTER TABLE ONLY public."UserMessages" ALTER COLUMN id SET DEFAULT nextval('public."UserMessages_id_seq"'::regclass);
 @   ALTER TABLE public."UserMessages" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    241    240    241            E           2604    26509    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          innovaterwdbuser    false    205    204    205            D          0    26928 
   Activities 
   TABLE DATA           e   COPY public."Activities" (id, "userId", description, "createdAt", "updatedAt", category) FROM stdin;
    public          innovaterwdbuser    false    239   2�       3          0    26728    ActivitiesOfCompanies 
   TABLE DATA           f   COPY public."ActivitiesOfCompanies" ("companyId", "activityId", "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    222    �       4          0    26743    AudienceForPosts 
   TABLE DATA           l   COPY public."AudienceForPosts" ("typeOfPost", "postId", "activityId", "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    223   ��       &          0    26528    Blogs 
   TABLE DATA           �   COPY public."Blogs" (id, title, content, status, "createdAt", "updatedAt", category, author, image, "companyId", messages) FROM stdin;
    public          innovaterwdbuser    false    209   �      0          0    26630    BusinessActivities 
   TABLE DATA           R   COPY public."BusinessActivities" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    219   s      $          0    26517 	   Companies 
   TABLE DATA           >  COPY public."Companies" (id, "coName", "coType", "coWebsite", "districtBasedIn", "shortDescription", status, "createdAt", "updatedAt", logo, "yearFounded", "contactEmail", "contactPhone", "customerBase", "socialMedia", "phoneDisplay", "emailDisplay", "officeAddress", slug, "businessActivityId", messages) FROM stdin;
    public          innovaterwdbuser    false    207   �      6          0    26757    CompanyCategories 
   TABLE DATA           X   COPY public."CompanyCategories" (id, name, "createdAt", "updatedAt", image) FROM stdin;
    public          innovaterwdbuser    false    225   m      2          0    26698    CompanyTypes 
   TABLE DATA           u   COPY public."CompanyTypes" (id, name, slug, "createdAt", "updatedAt", description, image, display_order) FROM stdin;
    public          innovaterwdbuser    false    221   [o      :          0    26776    DeletedCompanies 
   TABLE DATA           a   COPY public."DeletedCompanies" (id, data, "recoveryToken", "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    229   �p      (          0    26539    Events 
   TABLE DATA           �   COPY public."Events" (id, title, description, status, "createdAt", "updatedAt", category, flyer, "eventDate", "eventTime", author, "companyId", messages) FROM stdin;
    public          innovaterwdbuser    false    211   �5      <          0    26787    EventsTypes 
   TABLE DATA           K   COPY public."EventsTypes" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    231   xc      B          0    26892    Individuals 
   TABLE DATA           �   COPY public."Individuals" (id, "lastName", "firstName", "accType", "shortDescription", picture, location, portfolio, linkedin, slug, "contactEmail", "contactPhone", "emailDisplay", "phoneDisplay", status, user_id, "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    237   �d      *          0    26550    Jobs 
   TABLE DATA           �   COPY public."Jobs" (id, title, description, status, "createdAt", "updatedAt", "companyId", category, "deadlineDate", "deadlineTime", "jobDetailsDocument", messages) FROM stdin;
    public          innovaterwdbuser    false    213   `n      .          0    26619    Messages 
   TABLE DATA           t   COPY public."Messages" (id, "companyId", email, message, "createdAt", "updatedAt", firstread, "userId") FROM stdin;
    public          innovaterwdbuser    false    217   w      8          0    26765    Notifications 
   TABLE DATA           �   COPY public."Notifications" (id, "companyId", subject, content, "createdAt", "updatedAt", firstread, "linkForMore") FROM stdin;
    public          innovaterwdbuser    false    227   �y      >          0    26798 	   Resources 
   TABLE DATA           c   COPY public."Resources" (id, type, title, description, file, "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    233   5�      @          0    26879    ResourcesTypes 
   TABLE DATA           [   COPY public."ResourcesTypes" (id, name, description, "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    235   r�                0    26494    SequelizeData 
   TABLE DATA           /   COPY public."SequelizeData" (name) FROM stdin;
    public          innovaterwdbuser    false    202   ��                 0    26499    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          innovaterwdbuser    false    203   ��      ,          0    26561    Subscriptions 
   TABLE DATA           V   COPY public."Subscriptions" (id, email, status, "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    215   ��      F          0    26973    UserMessages 
   TABLE DATA           x   COPY public."UserMessages" (id, "userId", "lastMessageId", "unreadMessagesCount", "createdAt", "updatedAt") FROM stdin;
    public          innovaterwdbuser    false    241   =�      "          0    26506    Users 
   TABLE DATA           �   COPY public."Users" (id, "firstName", "lastName", email, "jobTitle", password, role, "companyId", status, "createdAt", "updatedAt", "resetLink", "lastActivity") FROM stdin;
    public          innovaterwdbuser    false    205   Z�      `           0    0    Activities_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Activities_id_seq"', 335, true);
          public          innovaterwdbuser    false    238            a           0    0    Blogs_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Blogs_id_seq"', 32, true);
          public          innovaterwdbuser    false    208            b           0    0    BusinessActivities_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."BusinessActivities_id_seq"', 52, true);
          public          innovaterwdbuser    false    218            c           0    0    Companies_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Companies_id_seq"', 143, true);
          public          innovaterwdbuser    false    206            d           0    0    CompanyCategories_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."CompanyCategories_id_seq"', 12, true);
          public          innovaterwdbuser    false    224            e           0    0    CompanyTypes_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."CompanyTypes_id_seq"', 3, true);
          public          innovaterwdbuser    false    220            f           0    0    DeletedCompanies_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."DeletedCompanies_id_seq"', 2, true);
          public          innovaterwdbuser    false    228            g           0    0    EventsTypes_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."EventsTypes_id_seq"', 16, true);
          public          innovaterwdbuser    false    230            h           0    0    Events_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Events_id_seq"', 38, true);
          public          innovaterwdbuser    false    210            i           0    0    Individuals_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Individuals_id_seq"', 13, true);
          public          innovaterwdbuser    false    236            j           0    0    Jobs_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Jobs_id_seq"', 3, true);
          public          innovaterwdbuser    false    212            k           0    0    Messages_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Messages_id_seq"', 7, true);
          public          innovaterwdbuser    false    216            l           0    0    Notifications_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Notifications_id_seq"', 719, true);
          public          innovaterwdbuser    false    226            m           0    0    ResourcesTypes_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."ResourcesTypes_id_seq"', 3, true);
          public          innovaterwdbuser    false    234            n           0    0    Resources_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Resources_id_seq"', 6, true);
          public          innovaterwdbuser    false    232            o           0    0    Subscriptions_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Subscriptions_id_seq"', 45, true);
          public          innovaterwdbuser    false    214            p           0    0    UserMessages_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."UserMessages_id_seq"', 1, false);
          public          innovaterwdbuser    false    240            q           0    0    Users_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Users_id_seq"', 151, true);
          public          innovaterwdbuser    false    204            }           2606    26742 0   ActivitiesOfCompanies ActivitiesOfCompanies_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."ActivitiesOfCompanies"
    ADD CONSTRAINT "ActivitiesOfCompanies_pkey" PRIMARY KEY ("companyId", "activityId");
 ^   ALTER TABLE ONLY public."ActivitiesOfCompanies" DROP CONSTRAINT "ActivitiesOfCompanies_pkey";
       public            innovaterwdbuser    false    222    222            �           2606    26936    Activities Activities_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Activities"
    ADD CONSTRAINT "Activities_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Activities" DROP CONSTRAINT "Activities_pkey";
       public            innovaterwdbuser    false    239                       2606    26747 &   AudienceForPosts AudienceForPosts_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."AudienceForPosts"
    ADD CONSTRAINT "AudienceForPosts_pkey" PRIMARY KEY ("typeOfPost", "postId", "activityId");
 T   ALTER TABLE ONLY public."AudienceForPosts" DROP CONSTRAINT "AudienceForPosts_pkey";
       public            innovaterwdbuser    false    223    223    223            g           2606    26536    Blogs Blogs_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Blogs"
    ADD CONSTRAINT "Blogs_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Blogs" DROP CONSTRAINT "Blogs_pkey";
       public            innovaterwdbuser    false    209            s           2606    26715 .   BusinessActivities BusinessActivities_name_key 
   CONSTRAINT     m   ALTER TABLE ONLY public."BusinessActivities"
    ADD CONSTRAINT "BusinessActivities_name_key" UNIQUE (name);
 \   ALTER TABLE ONLY public."BusinessActivities" DROP CONSTRAINT "BusinessActivities_name_key";
       public            innovaterwdbuser    false    219            u           2606    26635 *   BusinessActivities BusinessActivities_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."BusinessActivities"
    ADD CONSTRAINT "BusinessActivities_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."BusinessActivities" DROP CONSTRAINT "BusinessActivities_pkey";
       public            innovaterwdbuser    false    219            a           2606    26573    Companies Companies_coName_key 
   CONSTRAINT     a   ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_coName_key" UNIQUE ("coName");
 L   ALTER TABLE ONLY public."Companies" DROP CONSTRAINT "Companies_coName_key";
       public            innovaterwdbuser    false    207            c           2606    26525    Companies Companies_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Companies" DROP CONSTRAINT "Companies_pkey";
       public            innovaterwdbuser    false    207            e           2606    26579    Companies Companies_slug_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_slug_key" UNIQUE (slug);
 J   ALTER TABLE ONLY public."Companies" DROP CONSTRAINT "Companies_slug_key";
       public            innovaterwdbuser    false    207            �           2606    26762 (   CompanyCategories CompanyCategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."CompanyCategories"
    ADD CONSTRAINT "CompanyCategories_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."CompanyCategories" DROP CONSTRAINT "CompanyCategories_pkey";
       public            innovaterwdbuser    false    225            w           2606    26723 "   CompanyTypes CompanyTypes_name_key 
   CONSTRAINT     a   ALTER TABLE ONLY public."CompanyTypes"
    ADD CONSTRAINT "CompanyTypes_name_key" UNIQUE (name);
 P   ALTER TABLE ONLY public."CompanyTypes" DROP CONSTRAINT "CompanyTypes_name_key";
       public            innovaterwdbuser    false    221            y           2606    26706    CompanyTypes CompanyTypes_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."CompanyTypes"
    ADD CONSTRAINT "CompanyTypes_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."CompanyTypes" DROP CONSTRAINT "CompanyTypes_pkey";
       public            innovaterwdbuser    false    221            {           2606    26719 "   CompanyTypes CompanyTypes_slug_key 
   CONSTRAINT     a   ALTER TABLE ONLY public."CompanyTypes"
    ADD CONSTRAINT "CompanyTypes_slug_key" UNIQUE (slug);
 P   ALTER TABLE ONLY public."CompanyTypes" DROP CONSTRAINT "CompanyTypes_slug_key";
       public            innovaterwdbuser    false    221            �           2606    26784 &   DeletedCompanies DeletedCompanies_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."DeletedCompanies"
    ADD CONSTRAINT "DeletedCompanies_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."DeletedCompanies" DROP CONSTRAINT "DeletedCompanies_pkey";
       public            innovaterwdbuser    false    229            �           2606    26792    EventsTypes EventsTypes_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."EventsTypes"
    ADD CONSTRAINT "EventsTypes_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."EventsTypes" DROP CONSTRAINT "EventsTypes_pkey";
       public            innovaterwdbuser    false    231            i           2606    26547    Events Events_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_pkey";
       public            innovaterwdbuser    false    211            �           2606    26902 (   Individuals Individuals_contactEmail_key 
   CONSTRAINT     q   ALTER TABLE ONLY public."Individuals"
    ADD CONSTRAINT "Individuals_contactEmail_key" UNIQUE ("contactEmail");
 V   ALTER TABLE ONLY public."Individuals" DROP CONSTRAINT "Individuals_contactEmail_key";
       public            innovaterwdbuser    false    237            �           2606    26900    Individuals Individuals_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Individuals"
    ADD CONSTRAINT "Individuals_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Individuals" DROP CONSTRAINT "Individuals_pkey";
       public            innovaterwdbuser    false    237            k           2606    26558    Jobs Jobs_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Jobs"
    ADD CONSTRAINT "Jobs_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Jobs" DROP CONSTRAINT "Jobs_pkey";
       public            innovaterwdbuser    false    213            q           2606    26627    Messages Messages_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Messages" DROP CONSTRAINT "Messages_pkey";
       public            innovaterwdbuser    false    217            �           2606    26773     Notifications Notifications_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Notifications" DROP CONSTRAINT "Notifications_pkey";
       public            innovaterwdbuser    false    227            �           2606    26889 &   ResourcesTypes ResourcesTypes_name_key 
   CONSTRAINT     e   ALTER TABLE ONLY public."ResourcesTypes"
    ADD CONSTRAINT "ResourcesTypes_name_key" UNIQUE (name);
 T   ALTER TABLE ONLY public."ResourcesTypes" DROP CONSTRAINT "ResourcesTypes_name_key";
       public            innovaterwdbuser    false    235            �           2606    26887 "   ResourcesTypes ResourcesTypes_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."ResourcesTypes"
    ADD CONSTRAINT "ResourcesTypes_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."ResourcesTypes" DROP CONSTRAINT "ResourcesTypes_pkey";
       public            innovaterwdbuser    false    235            �           2606    26806    Resources Resources_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Resources"
    ADD CONSTRAINT "Resources_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Resources" DROP CONSTRAINT "Resources_pkey";
       public            innovaterwdbuser    false    233            Y           2606    26498     SequelizeData SequelizeData_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeData"
    ADD CONSTRAINT "SequelizeData_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeData" DROP CONSTRAINT "SequelizeData_pkey";
       public            innovaterwdbuser    false    202            [           2606    26503     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            innovaterwdbuser    false    203            m           2606    26727 %   Subscriptions Subscriptions_email_key 
   CONSTRAINT     e   ALTER TABLE ONLY public."Subscriptions"
    ADD CONSTRAINT "Subscriptions_email_key" UNIQUE (email);
 S   ALTER TABLE ONLY public."Subscriptions" DROP CONSTRAINT "Subscriptions_email_key";
       public            innovaterwdbuser    false    215            o           2606    26569     Subscriptions Subscriptions_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Subscriptions"
    ADD CONSTRAINT "Subscriptions_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Subscriptions" DROP CONSTRAINT "Subscriptions_pkey";
       public            innovaterwdbuser    false    215            �           2606    26979    UserMessages UserMessages_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."UserMessages"
    ADD CONSTRAINT "UserMessages_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."UserMessages" DROP CONSTRAINT "UserMessages_pkey";
       public            innovaterwdbuser    false    241            ]           2606    26577    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            innovaterwdbuser    false    205            _           2606    26514    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            innovaterwdbuser    false    205            �           2606    26736 ;   ActivitiesOfCompanies ActivitiesOfCompanies_activityId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ActivitiesOfCompanies"
    ADD CONSTRAINT "ActivitiesOfCompanies_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES public."BusinessActivities"(id);
 i   ALTER TABLE ONLY public."ActivitiesOfCompanies" DROP CONSTRAINT "ActivitiesOfCompanies_activityId_fkey";
       public          innovaterwdbuser    false    222    3957    219            �           2606    26731 :   ActivitiesOfCompanies ActivitiesOfCompanies_companyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ActivitiesOfCompanies"
    ADD CONSTRAINT "ActivitiesOfCompanies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Companies"(id);
 h   ALTER TABLE ONLY public."ActivitiesOfCompanies" DROP CONSTRAINT "ActivitiesOfCompanies_companyId_fkey";
       public          innovaterwdbuser    false    207    3939    222            �           2606    26671    Blogs Blogs_author_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Blogs"
    ADD CONSTRAINT "Blogs_author_fkey" FOREIGN KEY (author) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public."Blogs" DROP CONSTRAINT "Blogs_author_fkey";
       public          innovaterwdbuser    false    205    3935    209            �           2606    26691    Blogs Blogs_companyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Blogs"
    ADD CONSTRAINT "Blogs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Companies"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public."Blogs" DROP CONSTRAINT "Blogs_companyId_fkey";
       public          innovaterwdbuser    false    3939    209    207            �           2606    26707 +   Companies Companies_businessActivityId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_businessActivityId_fkey" FOREIGN KEY ("businessActivityId") REFERENCES public."BusinessActivities"(id);
 Y   ALTER TABLE ONLY public."Companies" DROP CONSTRAINT "Companies_businessActivityId_fkey";
       public          innovaterwdbuser    false    219    207    3957            �           2606    26807    Companies Companies_coType_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Companies"
    ADD CONSTRAINT "Companies_coType_fkey" FOREIGN KEY ("coType") REFERENCES public."CompanyTypes"(slug);
 M   ALTER TABLE ONLY public."Companies" DROP CONSTRAINT "Companies_coType_fkey";
       public          innovaterwdbuser    false    3963    207    221            �           2606    26681    Events Events_author_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_author_fkey" FOREIGN KEY (author) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_author_fkey";
       public          innovaterwdbuser    false    3935    211    205            �           2606    26686    Events Events_companyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Companies"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Events" DROP CONSTRAINT "Events_companyId_fkey";
       public          innovaterwdbuser    false    211    207    3939            �           2606    26672    Jobs Jobs_companyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Jobs"
    ADD CONSTRAINT "Jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Companies"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public."Jobs" DROP CONSTRAINT "Jobs_companyId_fkey";
       public          innovaterwdbuser    false    3939    207    213            �           2606    26985 ,   UserMessages UserMessages_lastMessageId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserMessages"
    ADD CONSTRAINT "UserMessages_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES public."Messages"(id);
 Z   ALTER TABLE ONLY public."UserMessages" DROP CONSTRAINT "UserMessages_lastMessageId_fkey";
       public          innovaterwdbuser    false    241    3953    217            �           2606    26980 %   UserMessages UserMessages_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserMessages"
    ADD CONSTRAINT "UserMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id);
 S   ALTER TABLE ONLY public."UserMessages" DROP CONSTRAINT "UserMessages_userId_fkey";
       public          innovaterwdbuser    false    205    241    3935            D      x��]�r7�}nv^8�Unu�ؙ��,Z���Qh�/�f�,�/��ni�������������"Ѳ�����u�Y�$2	��яu5���c5�T-o��k1]���ע��T�ԓT?��Prl�I��OӇ��^}�"���ؤԲO�A@�Ge6:�f�t1�ĳj�h����s�fcU��Mtf<�>�� �|��X�$�YH@@mc�#R��+��B@��"5c��i��`�|$��ź]Uו8���*˱MǲL�.��"���ұ)�i��\�!��4���m3���Y�V���B\.�7�_��K�ib��!}�e�P���V�B5��z��f5��>:p^�w5Λϕ�GAC*�2)d����P;ܥ��?�8��,� A^�~�u=��[�0���m-fU3�m�nŧE+�K�������]���eJ�5��<I�P�B�H�r����?���̸j�	�e*Ҏa���R^���5,���j
#��Ȼ�r?f������N��hNw3�У�%-�R'���Jxjag-��CZl �"���(�� �"���l��*��|�{�-~�f�DK���6[���jX3Y�6��p�M�f5���
�Y�f�o�l���@�l����R���Lbm�BȬf�`�ϼ����2K!a����$+|�>��vT�ѻ�ŬZ������mD�X��:BV�x�̰���WIX�>���(ӣ��|��P��k5�fUV�=�&Q��������Kج^T�z� ��qW6gX]YKN���/~^\��C-�{j��ж	�O���j!ޮ�bu���\U�j}'��� �i�o6m���#�#������ŗ�[A��A��76�*�z2�8L�&ij�������	�3�B�{�f���O0��ߜ���J��V��ov4ش��`�l��N�ABݢ͉ƩgKX,�*|�߇���sxf�ՠ�l"؇�}�l��Z�Vm��s�_��n0s
#	���;��;�~�'�N³Mn+�u�?����ߋ'��5tq0Z��2)��ԇP���Ү����T�춿J�lZ�:.��Lm��&�����i<3l\���0��!dFw%���E���+K�m�R���!m�;Bq�Jl0�}�1J*0,s���o j����@.$��ck{S�a�^I�_.adI�}�ь��-�.柚�R�{��������۳�&J�84l��D a�ɐN\��`��!s�m�KP2O
+�&\�(nb8� !��z=Y5�9n�'�0��d�6�{�Z�&��.\�]z���I�z��E/ﭸ)��,������w������b^a"����*� �A������ lV�2;����B�_ph^���AwX�,`!dV�0Yp-f���)B؄�t���m��{���&�e&QR̴�z�ھ?z}=4�����z�[v�u����'L�f���IBH��,�k�O?�~}*�����z�����_��޿:��89~�����͛��']���fo�RCU+"W�N�N��XeI�[ABf��߱q<&���،$�^�����G!���m�Өa��7��7_6����fu+�Y�L�8i�Ŭn���_$�VO�{͘����P>TyP�����Ӫ�W�r@�'����c�	����R���x�2GZa����I������~>����b�B��L���ݿn����	���8��+��ݾv��!V���@�f�,����1J��c d�w*��(p��Mqq��Q������8���<$!d�3 n�`N��D	!3�(a�3�C�H[7��Bx4�4��`�6'��r=]uˢKj<k�zr+.W-��ty�ߟ?��TM�O�j���݄�j�:r:g� T\>:ᶢ:3��/����*ʓ��:Bi��:��u,s.R;�/��r�X���N<�2�x\eB� B渣֝8�2�D���9.�0Od�����3�|����~��Ӣ;�������p��2wu�b	4�q&xǉ��m���� l�A/]�����������n+Xb��P"�g0t6�����8.@�2��*U�!��r$��\�������������n #�̆���q�7��������[���q�D�x�R݀6��f d6�������ƭ���)����I�KtCU�MwBf�{�]ޮgW���B\�Y�,������B����������z���!�"c����uB�"n�D�|�d�ba $~��"�$O�v�w����O�w�Z�&y��4�j*޵�|	��BO@���P����]+6��CnS����z���9@i*���W�?T}��ֲ}�J:����q�� o�JiE�@aS��BBf]�m3�	��M�X��� 1x<g���I^*��!�^ۉ���=wS���q;�#3@�%K����q>�����[�����jƬfK~-�c�dA��!��s�-m��1��3����9ʙ&i����ܚ�8����0o�l�X�C6��j
��m=�,>�W���@_���\ms�&�����b�h���#O)��&ﴘ�H�ǝ�,e洕�-{l�0[:�3�g��}���0{��\�\�Z������B_�˜�؟/Nο����#O��r��X*@��㉿�,��([2�.D��[9�<~v��\�M����Д��J��!��5X/��"�����Q��ȋ�t��X�h�E�d�O6tbU��F���7YC���J���B�|��B�=9Y�fu;���d��Ջv?/���α�}����C��<̍Y�.ڕ�b�i࿣ Į��5�2bY��s��H���'+,ז��CD��ۉ�.o�����9.����y�s�?\��ai+9z��u-�VWx
}�rS�B��j��qg�ܝ��D���9f ��c�1kZ`��-!�������G;�/��jگxΰ��M�� 9F�����Q�B�ˁG2Y@BT���� =qP������7���Ɠv�d�Ѫ�q�`$5����@ĭ����z�G��|s�nm,D�wG�3ŔHC�ҰQg��r���
R�r�,D-����lŗ�;-Y�ǲJ�!R"ο�1���vIN�k�X��������F)�e���֧#����˦���ꪹ�fWu�6Q*��:�+�C��h�)�*�!d
q�YC�hՁzc�QB +O��a jB[��gK�	�&�77a��=nc!j".��R&�p��5�������>��4�j��≤�GH�S���BDw�Ul���bɌ���QǭԂ�R26I3����:�� ��b!T�'�k�X�.��J�G��T�u��9W/R�����h�3����8�ܶ�n���q�q�W\ұf���`�W��BD��,b'NE�N�w2�BD�k��j����v�vS��=Gn�v=�(��y�j,1�=
K΀`���CD���n&�C��b�&~\�S��`om~�/��P��	�G������a�qq��= Mː:��:n����h��
.Bj��v�PQFM�* !"�]��5R<b+���u"�VIV��T���:���9*<݉�h���]��+y^����YMn?�v�,����n�Qݍc�*x��Z7�g��:"��*S����9�d���<D�Q;g ������:j�v���fKHBD�h����t�����C� Bځ1��.�`9�M��u"�G=[)������"1ε"Z�hGH�A2��e�W��CDu����x�ĭ��!�6#��E�&+hw�F���<��}"��'7Q��~�CD��j�o.��:�C�AD��v��΀q�-u3�s��%������q�O�)ٛ2�ROc"jy@ViJ<-�2f���B�ԯha��=?ėc�Q9��X�67M��c�����x#s��������򶺪�x��*�O�{1���;jWDy�y��AN���:v]z�E>H��,��]y�����@D�.Y|���8�BDOz�W�CHW1��U+J�:�;�a���f^Mj��k�K��瞢����U%�q�y��ա� �  y�1� b��I^�k����C���ZBy;ȼ�縕������V�N������x��1��F�u{S�7mS�īe5���JO�FQb�i[z�����h��x���I©��j��z�!@���N(�CH\�.DE�6Ŋ9���!��)����E����ݥ�� �ƕ���^�_������y~q����vY��bwr=w�Z$�n-[�yf��AD�;y�V��������m��б�Ԣ������F��<n�s,����7����O9��1tC�r�3�Gl�$�������L�R3QGl� �6w�ew�9w&
��%�8��2Iw�C�O�F�a%/������z�K�����T���t����=���������<
*�RY^0��A��au�����C�n �5"'���(#Y�=DԼ�x�6����6a�]:%��0c�A�8���,M�z�x"f{��v������gC5�^����k9Y���=;��d3'<��/���-�)�K.D���+Ow�R��%Bj,�z�ޑǝ�M^AD-�}�-��lQ��B����N�`�q��֟&}��㼂�<,$| ��>D�1����а9�6� �#<<�㺞�������5��X���k� ������,�N���<C����C����K[q�W���B��.]�"1C�;���֥#�.s���{�U������D�B�!���u�-�2(_��58�F�����hf7b�N��/���m�h�z�.fw�?_/&k��	�����kF͂�Vs���7nDj�?LM�������A����Դ��p�)i�0%M�a��gp)��qJJ|:G����������Ȳ7-}��,H���jŲ��n�k��bs4���f�� ".���M���,��XwOl1�����<��t*�� "��
�zq�^Ϋ�R�+\b��ٝ�A����^��x��V�Q����$�[�V~`-��!,D��[��yj�|�wv�+9zs+��O�M�!j#.�p�5�wLY������K����*ܕ�B����<놁�u!u�kj=y��!j��~W���AC*sA�c9i�y��@�F\na'O��hY0�.D����)D��cm�l��㏿4?���Y<P����z���4��da-�0�;ņ����+-��e ��8(Л��XmK��z����q�>���8�֌#o08��Z�lJ�:�!"�˷w��Ex�֠��"q\>r{+u+ <�u�CD������E�=�伃2�*O��ߢm��b�����=��[�8)9x9��S�t�l��r)�'���m��+�E���{b���!�ԓ��I����� �ޗQ�ƚ�����R�3�Y�ڈ۶y��*c��QǝPX�x*Э�7��T"5�Jd���9L"u�1�!b~�15G�����D�q��V������=����N��Dڌ�v!��ۤw�t&��tBꘊ6_^�Z�Q�e!v���r8��Q��͝<=ߩd"ݣ+"�ص�ɣ52�S�CQG�E�5�d��D�q[�V�+S��BDqv���,�Uo�Q�����
z�1W|Q��Ro.���K���CD�,;yz�*7C�BH�c@kGx����e3g<C�P�>}W�|�>D�:��KےrB��j!zinű�8�.}������^b�G�~�CD�4�K+���u5����QN����x"�F�vώ*��Fc�V��&�5���&�t��b@��Q����)������C�[�y���{�����x������gg���s���N������x~v���s����������I~�d�_���o��v���x����h��N7�$�-LmoGb ��X[���C�~� !uLi�#�a����X��c�h�/1��`N��DԘ�*G��Y�7��
_IX��[�=�
�M��[�D�B�T9Z'F�{w�1@y���!aޣ ��ݧ��NM��Ruu��(�k�PT;l-��]"�8�9��.,�E���,D���|]?�����j�Yu<�۵D��齤D��A"%��~P��zZ� ��of�)l_Bj�����}���
K0��t�^�j`m~��e�F��@�����6�Qѝ�D��ۇ�7�}�-�4Z:�Q:�!�xap9=�x-N�?��F=�.&�'���?�O�W��o��̲�`�D'G��5&��"c�Y����4l-ʣ�!�gL�Ma���V}"�8���eW���
T�!D�y�,+7���*)L���!�s�I^���xh���:��:nsϨL�˔X�Y�!�'���4�7$-X0����o�|�_�	w�e�o�5����Lᯒi��!�Z�����GdN��d�n��x���T��X��5K\{�(l�O^ʁ�H�8���q��q���<�!��]ǒ^���ՙ?��Qx�ED���)��V:Q��N�Ь�X�=DԱkZҍ���U�mD���H���R��.+6��g3���������#H/�vǟ�1���w��BD�gF��C��� �������5<�7���BD����Ѝ�KuY���fN���,�ߔ{�D��F}y|>�F"ꌥ~����t��#.�yuS��uu=P�����w��Q�2XX���)�A�T�Zv�K�`!�.�JM�8�k&X�����?���ag6���b��OA�A�|��v��~�<��y��uܹ�N�OR7��BD������rJr�B�]�5���tɁ[�DԼ5y�g-�����c	"�3D���;�T
����r�i���l~_�|����v���Z��"����9f!��݊����?�j��26"��ü��-��˝��C����Q'/�7i�v!��sLrrl�lE��� D��#$�(��$���"ژ�;��.)y]��DܑQ�K ���`���C~����>,�p�|�#w��C�b�o� �����?2M�H      3   �
  x�u�K��
@��(N��v	�7c����H��+��H6|J�`F�����?�o�ߌ����N~J�1�?�_��y�V��Q����<�@_��V\T�R�����!� ��<sңF(���\��3|+d���?n�M���/գ.�:������ԅ��0�cF(ͧ�&�����_%�g�HJ�?u��y�޵(<�
(�-��8�k���]�b�?/�k���y�G�%��=`|8"� q�m�ԏ���Z$�kf	�qNA���9�8�X�����+}s�l�kPz�п�5#âŤ?���7�Q|�(�̝w�֙f��J�T\ƗcJ=Js=��4�)q�_,�!Qg�G4�V$3w`��6^��z��Bo$�V��@w-�"�j���i!쵀�c7�W�f��F�y#�f��_\��Y6�YfF�`Y�x�-���e���)d�k�S��,C��$�l �7��>vwC���r�
o�<���H]��4G�%p�g� `�A�^H��8k(��{#q��t ��{#u� ^��:=�g�\&���Zw��8��G�đ[yB���b���iG�Rim]+7:s���H\�����H�tD|�G�^H9(��}E�(�a�=g�����iWաTm2#�?�
ys���+Juɿ$y����46wC�=`Js�uy�H\
d/��z1����d�ۤwHݽ��%�
��(qV e��w����J��J�}g<w(���Z�ŕ����ӹ+J��=$�UV�\��(ն�s�J�g#��t(�e�R�ipnG^�k�R�~P�=�Z0*���:����F%[$m=Lx�&L�Vy0ݙZ�M�RC[ݦ��d�TX�C�q�<l ��K�Ɯ��!qanUbښ�!q1���P���p^�s\�ĥ����uSiKE|>����	p��7J����:9�B9�_\�R�v��z�d���M�Ij�C�rɷ��<qS7�ڒQ�Asv|]��H]���p]�=״��������%<Z�{#u��J���H���T쑶U���b��� q� ���稝���u�H<�GvM��c���6�����ڈ�j?ņ(5^��pnR �	�\\�R�{Tq �s�ܔ��B�n������ݐ���v	��3v/$n��qݦ	!�ZП�)9b�����U,�u$�)�M���������=�l�J�%�H���G�����ԟ��/7YA�9��CQ��������lk��d�n*�C����?�둸�p���s��&D�v�{8Q���*(y<�7n�C�R�����k����D1+U�RKSiR��LZ]�R��r��y�UINI��L��F��{L�2f�}	��Ҁ_~�������$Ī������5t9�ݓ��Q~��[��KC��uSl��煛�\ξ�4�p0��yI��΃?<n��h��yh�UҐ��U=J�?����V�S�Ҿ}x���"g�	eQ���.>����J�s�3*ՠ4�o�^|�CNYx��/(���8� �NI��[;�DL�/Sjݛ�h���m��>�g�s����E�݇9vo�n���[��HܲH?����C���Ü�f�A+[��.�3���[|@��Me��u� [���$�>��S1g���Ev�`PY���Y���|���uϬ�K�``X$.�Yި/��3���Hy�&w��{#-�� �Z�`�HG�k+�ˆ֣�2H���J[��E҄��]��.�g]g�CiҲbL�!x䖜s��Ci����M+0�W-J���:�����]&�Gi�Js���T�%@��a���]����R�RB�""�C�u��L��49iN�tjr3n�:� /S��C�[��3�.R����Qw�"c���b�lv��%�9�-�NX-�k�;@_�Q�D�vwE,ץ����$����2l|T��#vx�"���D�5b��
skj�X����1�CZ=���PX�ң�$����=b�׍k�/|B�3@�w�ԍ!��oΈ���{��e�b٬:���|��&Y�#����������.�R�`�(MN��5/[�r�$-��7A1a�Y�*�H._4�c�4a�,5Xg��r���ƅ0pR����6B�F*� ���{��mObV�t)�)����Q7^�ˡc@�Zt[�>�#�H6����UOM��zGZ���e>��'bH���,B,�'Y��9�9�rVQ��=J��{�z�,�jR�"dW�X�'��#��8�CN�L�|��?B*�e"�#-{T��Ͼ��
A/�H�a]�إ�m&��{��uʅt6V˓Y��ݺ�L�u=b�>7"So �%}	lw��<��E߯d�j���E���y�,���/�˙�O�C����j	 ) ��[�y<#+ ������y�A	�Ʉ9��Fh�����x�+P~�|��W�!v�7H.�x���U�}�k6��S�#��x�w/[t�{ Ț�܆� u��{��7b�����~�����f�>t�X�R5�3�o�u��=�_����DT�{�r����N��C�F��l�)� ,ը`�Nw��}�}��Tv5���eX�A�B�ܕ�B(��]s��1.�Fg���J�Q�:�>B��~A,�AU'l����|5��X�����ę��g����JP�3-�|�-�6��˃�!�����������[ �^��]��uO-�:9B �2��&4=��j�DSp��GJ���m�*      4   �
  x������8E�������DYv��W<0Lo��c'��*QA��ݥn��KZr�տ���?��C����8E�M�M�K�=�{�0k��4��~�~h�i�R A|�1	%�U�x	P$l�!�p��D���q��Q�4P*b�Ԉ�
���-����`�f�U)m�LmDI)A�.�6���� �a$��H�H;Q���j��نj�I�����h���د7H[��s�-�n9�ww�s˻���L��vsr9S��ٜ����?�����ӜL�)����9�w�{w�9���:9,�a�u7��˙t����l�̳L���q�a�i��I�`��A�]5�-g���'������qn9�\w�8ix���bq�_���Սu[w�8�9�\w�8�y�;|�\+�_����{���.��K�]�%D]�r��r���Ϗ_�z߶9-!�~[�A���_��k�ץ_o���L��_��_�S����������������^�}��������p�p}����Gh^��C�������z�oS���%��ȸ��Oi�㛠�?_C\^��ӕ�.��F�E�����q��5����3����`��+����>a���Sq͖����E��E)�!���+�3�ZD��D����8�$p%"R�|�
+�x:(V��kdI\����R��
;R��xo�1��7E�~�]��!c7`CF�V	'��x~����})�Ҋ�����u�+X���Z!�}�'aM���`�~)��J���t��]�g	3`��K���+�m���<)ާ�bn�de�[(��]
�3̘�]�gBp�����P�O��/2��5��b��ǫ�4�<�e衃���E)�!���a�:f���|�2`;$l�4c!���8�m��8	�
�B���P7�b소T�*`��݀q[%�D{�q������pK�	'�q�	+����[���5��'X�4t0���e�v������⻰����0{��"�=$ʀ퐸��\�'�+��J�O(����X����uK�Z�P���Wؑ���{�Y��)2��*��2�J8��Ǔ��$.&�K��V,d�;Vb�y���)�7�5wߡ�����&!��3T�`�q�y�� 뀡B&��i^GO��AܰeI#�'t0D?lՁ�2^-R�)�2Yx���(Y!�O�%��2{HnX�%+t0xvX��A2[p젲庸228B����C��%��J�Uh�Ibv�4� �bRp�E�RFO�0x2��F�2�-a`�����t�6�r�>A�����:ȡB��	��;"2��y+��W�A��	Ӑ&24��ѩD�A� �
�Z�QE�O���D�C\}G7�`pj�E��@�
�$�&���Jt�L�IB�<K����iѓ�@FȮ�aK2<!S�n�na��?s� ��!o��'x!���%��9���2�A�;7�ǯ�@�
7j��3����L��d �/l��/C�ǎ�����` c������A%dZ�K����a���=�Vo@�4�c�-��O|���m�B&'j��4 ��قc�-�,*d�	Y6�JQ!��nB�{�B���"&G�-�dߐ2�t
7�.~2*8Q1�w�y-��ܮD�-N��Bq�x��6:ڕ�2C�]fhW���]�gX�v-�΀k�e�vH�XH�㌓���\H��'VR�tP�d�]�$��
�m�k)�y�)�O���Ù�"c?�R̐��!#n���Hx<	?H�b�li�Bf~��:�����.Gi��81}M�t����A@��r�#,��I�����C^2Y'�����P��!�aǻ�d<%�0I�*dt7lm7�d�Z��}�4�Cr��`2:8Ylay�l����a�j��|Ĥ��A��ہȤ�ɘB�2V�҉Ґt�C�L��.��d��*�C΃=T�0�6�u�B��+���h��.NW=��dQ!��(���o�?�̾�d�ҟp2~�nX���2�t���������U�!�228m���Ǿ�t0x�܌[|?5Ȩ�%1���������-��A%*d�����v�=T���v^��@�
g�na�:ȢB�>�:�/:�����k�/:r�GXq�0�ap�bH�l0���c؞(�S�@f^��@p��::C>�V��b Sʮ�����V2M�m��<�e�C7���;�A2m���}��P!��s	s�P!����8�P!�����|�gh�q�#��m��I4�8�����%��l����ARЁ�d�p�6�Tx!��N%��������q��o�㛥$����1؃�v����.5�ڕ�z�2`��s�{�B
%P��2軰���Q��p-���;Rqo+.'��������e��	3D�U�φ�n���m����&ӗ�w���u�}[�A����qmy;r\[��ז�w1,gҵw��3�#�􄖳�'Xv�nf{g�G����
g�NY�+���.��)����l�0�sMە�Ie˙�33ke�3�:�\d����4t�n�ۄ9V�r�JX���r�l�[�b�Q�yڿ���-ƃs���`n⻰�V��`\����(�C�v�Brg��D�B*eP�W��T<+i�!W-�k��Bq[�Z&�'�n�����bl�݀{B1�S�vJ�!�~�å�]%ؐ�gl�G�P\���ׯ_��(�%      &   �  x��W�nܺ}V����"ɱ4��(Zǎs\��9v������pFqH��F���}����%]�f&��З>��cQ��\{��6��i�1mX^kn[B�؂�+%Qr�MI�RI�lͤ%X^H~[3x�\挘Js�$q��$w���4/)��e�U^2���]t.	%m����ǋ3?�vW)��D����O��Qk�Z���J~O-WҐ�iF���6T�\���I�Y�g8�"sFi�-�K؊��%��E���f�HyA�`r��qɚ�T�`9L���V|]i����9�����k�� ������\�,�	�Q�j=8H��(��tJ��߷{�^d���?]4'W��v�k%>zC�\T�������KݾY�͂}��^mRA߿y{�wE���v�X��W19��Q����Y͆a0�	�-yñ��FiN�a8,�@fƨ��W���fњ�"OW��Zz�Ļy�,�~S�tE6��`KƅC�;�h�/���H�礢6/H]ͩe���� p�8�WD~B9���7o�xGOm����k�;O:��ዀ��ؔ��:����\IФ�Id������6�k����U-�����?�5�Ӗ��ATmI�@V�`z{��_����ܣ���6�3ђ���P˥�������;"W����9Z��c$kAT�s�j�8�J��	��%�Ar*|� Pz����g���{�bt>#;�
Y�.����rT�\�Wsrt@��B�d<��`�Lh�p:���a�=��4�R���d��˒֓���}�Bc�D7 
'8�pI,P棍�L?j�^G��H�t�"�8�.��>D3K�-�r�t���ذV��`�(I��
 $;ޫg�DW��PU�X/  Ԡ�$+�to��@:
���5�e�x�\jf߀ �p�ӯ_��M?��	
&*��^]��8�Q<��ك�	�7x�C��q��#������������9����Ri�fE%�Q�����iE���,���F�h�����*�~-n#3���M��A�'�%v���]zfׇ�}�wh	x�ظR���X��d0�	�����Zp�{x����{vǍe�ߠ����'9�x�V
zшallڀA�EGJޫӎq�Tg����rVg^�'v���_�嬧W��(�o���= >⤦`wvW��z��;!=R@|��q��߳�
Зz:�A<��`�å�,�ɖ�T��V�F�코q�X���1�����I �4�����AD��ᶏ�0�!��Y��I��w�/MIٚ�Rhq��4����m���[��;����,T�\ٻl�+�?���n��t�_kt�9�r���Krڡ��6'�u��s�\�!�:��� �t�����g��}L.,9O^1r�)�c�m�
�B..���ɻ��ˋ3H��<��3�K<Ǔ�8�Y�n�[��.W`6Ȭ��`
G�G��!�f'�,��Q8z��~)F=�=lQu�!��p[��|�[�F�ݖ/ei7AòʛN��NB��8z�dL��[�:��ML��j49�x����)'���4�«;�,�܎������>D8��kK�ż���\! +���az�4��<���qR���n��meݕ�U5���}�9B!�t��D� ��N&����p)7dl/(.ݽ�(�~\ьQ�e��g�4�w�}0	A�`�9�3�����m�պ�P�y�Vv{p�_���:/��;EV�_���������e��aƄ�������5|	8���%���{�Y���y�����O�^�%Y���u���2��_��fh�n�{ Ƹ���<�1
���~�v����]���KL�4��0U��f��@���X��p/�a�v鬻���f-z�<�qBB�T2N�$:T�~)��a 7��x��x�s�і������8�ػF��}3�ڠ��G�:�?y����7G;'~���D�t�A�>���]a#
5��.���h��(���&x��� ��8�      0   T  x��WK��8>ӿB�E�E<����yt'@g1H�ǡEV2j)���_93M��ww�9�D�H~�H�i�va�Z��wfPL��	��e��$��O���PX(+���V�)���jQ��$��J�T���3X������0U��[	�d��fw���
��[�H{�
'nk�_2���;�3�=0�.I��{�Z�[?D
�~,�T��a{�.�6�s�;\�nu{����)v\f������E\Z)<+�A�7r��\�Ú�=#��9�7RY��~���Z�?��R	�^0���T������~�f��j4Ӈc�R��V�VpG8O���b'T�)�	|��v��?��Z����ߵ��jq��O҈F�~��̙eh&�5��;���Z�q�=��f����r�b͹��G��{�?�oAa�7����1[9�:�������J~i#�;l���Be��I.Y���M#�By.�(�i��7��B+�M'�N	,[QעF�sk���Rw�L>=�}}d�wi&%&!����DL���Yۢ�	�ʡ���aVo���n}��Ȩ�>�x^cXp�^*���lj������s�37Ku�+���9��A�h�&������]?<޸��m_Ӏ8�k�����+��]n�f���g���%)B�E�`�LA��b���������HpI�'��CSg�����)I�"*F㯦 ��\�ӣ��v��Τ��0�c���>|�|X�������BO���?ѝ�%{�KJ�i>���$�o�-3������q�`LAB��d����4�GN����k\R�ԥOG ��qEo^^���Q����6NxE�{e%��<Kg`
��A�o4-�      $      x����H�&�[��\LU&Z��N������
����A��(�!�T��
E��z����Οy�y��ُRO��fF#E���^`�ؚ��p�nv�ع|�;��z]���r����:.wI=�긬�ò���4:��N[�Y{:i
G/F/�*^�_�X�;��[KN��|em��`��doUI���Ҋ7e�l��)��:�ŪY&V�gi�Xua%yՔ�/����F7[�p��M����6p�to�^�T��L����K�=Y�J�?��:���N��.��ݲ)���w�� o���F��:۝8��ؗ�{�̧�����-���xȟ_�4t<<���߾٤�6΋r�W�}�f8^r��o����:�����p���^�p�!Kb�����:��Y�)��K�+^.�&����,}L��P�9iR�Y0�V׉U&��d�8�mQ�pA�o�␔q�9���1�y��p#���#��p(����Ͽs|o��'�!Y�,`��r����r�G��q����&�7�y�Wl�Ny�O���4ϋGxx"^��۟,���JV�����*�G|�M��Ɇ���_U�5� ۸�)>&��+|g�[���HNE��Z����0,Y��YRU�!�*<�m�9�����{k��8�ɞ�,8�O*���Nky)x�,.7$�����7»��MZ�o�iGN��e�.���	�3w.r�9�e]:�t�b���Oi����b�Sp&n��DM�(�~�~������zQ�ah�����iQnF?��ݥeѽ�&6�nW�ꭞ?�^�_��[E�Y?�ueM>�pD��^�������L�j���-�f���������4�a�?�Y���P$I�S�W��Q����ӏy�;|\��Jkt���,�		F�U֊֌<�cί��V�����Z�I��硚*��%	8++Q<pjQ&�b���H\��>u�UF2��p:��c��L�l��kx𡌗r�,���8� �H/�ϧb��(���XK���<M���˵���.={:we�M���#ԃphf����eu���"���)������]�V%�)�r�A���4�
����q䵍;�|i�SU�Vtܦ �1(�#��
�ʪ���J��!���t�������k,K�H��a��%Lhٸ]��X�h�k`fA��c��4��E{ܰ�9��\��uR��TI��;��4.�Z4^�����x`�
P�80������e�/����3Zūt�^u'�|�ғ�9�c���Uq�Q�Q��ڧ��э�=l�$�^�c�K^�V�iU�Ր��x�^]3���*ٟ���o��w	
P��j|d�)�6�L�CA�J����J��$���@RT(�bS��N�+��S��E���c@C������e2��	�o{P���4�>�pc��Z�G��\�F��Z���!)�(��=��tU���)�2I2=�����坺=�^a	;�;\.�C��1���L�^����1�Z}�g��4�é���6Pd ������G'�'���{q,���ԫ2[��ݗ����O��w�N��b��n`G�,t��uz��.��k�dL�8�>��htW��V�2���Ǥ�QU�dY��JrT%��yi{,�i�k��;�%��:�5�rS��ʬ�@�,��ס�	�>_o�l��Sߟ��;�x����ۗ�?�f�V�T�yOsP�EWW�7��L���>{b�>�q�7�t�������{���󡥽K��Ɗ=@?��y7y��%��dŁ�Kn��Q��M v#��E�Ԥ�ࢱ,�1]��<8(ډa��+�M ͜=��1Z�`�մ�����;nе��-V6+�mm1Ű���[�Ӳ�ڮ���W±�&�D�����g�(�4
 �E�����:��g�C�!�`U��8ʨ K֙z�L-�`��Bq/�U�)g��>��`�������\p���2��N仞7����7�/~�n�9�>��S5�������/��հ,`���N��W��܁_���a��=�.�gАu�H�l�����EX�b��+1����C�����DNa�7����,��;�/@q�tW��2O+�� =���2=��׃��	���_��TZ�p\2�5~C�K��d�,�5Z����w����啨9��P�*��/RZZ�a?JA�R�Wڧ�0L����_�H�������!��ĵ-g"x��^��,��F�\�9����8��=�}u�pk=�{q�p��z������Oi�><3��.1}�[<j=+R�-�$ɕ�{i��,�]N�5LN�uSo�2�
��}��k<M�H�j�� �������]N� ���h���W�?0�ϊb�?�?+����?t�;�^t>��7�d��֏o���j�����w ��I`|�o��]U�ug=�X�����2I��7 [�=8�u����"9�%�<t6���(�@�9��2�h�i���E��
��)��*aB��W{������h��6</o���E��!�6�y8�_V������1ɋ��7�Yh`g0UWqr�鄉�1)i�H�,���~�Mq�^�{�ِT.��eq��M�m�\��i���b6�\c����	����o ��\\~K?����M���V8�"�O��X�7���u�rx�V��� >��[�X/kX�־��ryZb���]x��f֙��3��|�Q96��n0�#�"g���˝�S�s�4���������.�r�Q2�`,-��XhG��c�LaᡪK7�c�z�!�=)aC���ŉ����@�ݩh�����pU��*i	��������F��I2���x2�Ag�O��+4��#��ax�`���!�?&���A]�yRoI"{��]V��'s���&r�$��kϣؙk�8�8~�`h����i�/�F�L�B5�ͻ�&+�9�fi�-��WrA�`���0ߨ�G����%�}S��M���h���{�ڨ�'R �}�+�n������l#j�Uq3��\��� <�<�GO6(����]�h:�UKvm�?�/0Jl}�(E/1S�,��˥Xb�|Sc0�'��g�p�6��z/r#PQ��bӛ�Ob�u�a@��H<��n�k�0<�I}��=�&�p7g���`���,7�0�w3p<�b[�d��K��U���{�� �K�2N�Iv�����7��Q������?���ƁR�Oh�՚σ5d ��j�`WN#H�#�kktʍH/���Z'ؖ+�1��9hU���pTW)x��,=TF*�����H����@|�RI;&����^���˧�eSgvj=l��BLF�0R�/Z�+�ɦ��+�,G�7�	J�~+3n�1���JPK�pU��P���g��u�Z��^^Y�,�d,9k&A!�$���NM�Z��+pM{
���s�,ɷ��vd��̚J�&�I����L}g6��m7��H��ڶ���_}�%i:�������#�z �e�I��YS����D娹[rN#�^��B)��'V��D!i���xf�y8�*<��DDDd>n�Z ]L�{�kڊ����f���Q�u/P8pPi}�t&�
��T�`PEw9� �2} ?������-i����9���t�}��X<ʯ�d�1�PZw�o�C�r�[46���LX�^��5� ��Ƴ�x�wS��$�U|$�>���G�`�o�ǽ�չ�X9�d^��¤�Ї%����Ӓ޷��jX�z�V�_�s(��_xm��,k"z5P�a���i)���'���^A�E�DQ �~��L�^1�O�Xk*iU�?�bLM58:�q𲹊���H��4op�S��3j�d䗠� ��C�	����u
���p�����Xq>���h�W��F�o(��O#Gi���1V���L��|�_��+����7'g���ɜ]"M@�a����n���o�?�z�~� �|���ͯC� 4�b@Y�1=�'�Ս�hK��Z�I��1.�Og��Y�$c�
eV퓄#�9��0�(��󎵳��AP�ؙ�O�|��8Iq9���c�x�������?�����j�ݿ}��    ��kb�x����ֺ���Շ뇻�o��ۛ�o޾z��W:����3�ǋ�����-ZR�����.�_C<�W.nW�i�I�>�k��������K�F���i�qQS
�
�� ��sj(��Qe�tqm0p_˄�u�bS6��.�OQM�8X6�6��)(�[��m�U	�<ƧJ�[Y��K�%�|薬�	��o,/�CP&���
^��P���A+liL@A� Q��a{'��E]˼�m�����'��	�Td�7��]�	&�R	*?6�J��C��uG�����@-���T��UC���
c�<az&��v�[C�v�u�D�R^<UrI{BҀ�>��7ŧ��%#ֶ�6{u��c9>h�Kߝ�#e���=�����|���pL6��].6 ��츊u�(����\��u�����چ��_��Ԯg���x�I{�ɒnx�ir��^'{����&��0	�(�]��m<��n�]�tg0���2�ix����mq���5,�!����P+������{�,��s�cQ�*ݣH��F���k *��^�s���#o0��{Sǈʀ��Ȥ�4)�om/�]N�N*�	���B�k6�w���7|.иyN0�-��������a�+� �8mѤY�:}���r�����MK�s�[��~���ZP	��1��%U��<��2IIe�	G�F�^����"H���y��[$D�JW���{�XP��<���&����ۄx�ga;�yQ���W��M:�����U��&�|������P�ΌRcwm�K
W�!j��i! 2h ��I�>K�{�(�a7��`�(��m�!�B;�.��l��V�O��c�g4%���2�~�����Y���E�w�Z�����qӍ�%߷��D���;X"�]N����0
����;��3P��|�,�%&�0�
�p�ckf����G�7�Ʋz12��L�w�:���(���C���i�V��=Xb8*�U%FBA6��$ �K�S�l,�#�E��3a���G?�RnO.JI
���$��NW`ˊ#�+?%E$n�����`	"s�b���|A榲 �3�?�%��� �t؟�sw�� ����}�?��O񼞅�1},�u?*/��~ҫ�T�������?zVb�	Oe�q�`�a>J;���\&����^0|k����Ϟ�����Y���$�J����&m[[���ۨ�x�
��./�Y�ڰ�n�s�˩g�(���
(���(5u�[rĺ�PH�A�ar#��~��������B���FY����;����xSCo��0�3%��\�=��p�XnAZ����Bt-�`s����E+,-��a����]1�N��pk_�.�Y^0��2E�^j:N1��g��5���� 7Y��Vq�@Y
�mA�E�T��Nꇎ%�Q�(l(A��e�) ����K�P�}�>අ�ӵ<�nxn&6@;���DP�P��W��=c�T���V�Qh	h:%��:9�Q�Ď(����2Y\��S��������r<?��������u�J���]Q�O��Wk�>�33�
������ݏ�	屻'{�7sC۾�W�V.x����6���?f�0��^��:�l7n�����/���턗�l���.s7�����T�����р�c�퐮�C/��+��H���e�A���yNH�nh�O�ZP��ip��y�w�%!-�ܺ���kx��L��:%�0b����=�YP�_
}}�Y2��4������\at��,;�;�02<�<��W�1;wg��i���Ԡk���}���0o�k&QQ�����r�2���#�}�.(����H��,������=�`&ߋ��Уx�lB��m�d�b����)�C �;��l:��5k?�l��� �Hc8z}�����ð]��im��|�TÜm��1���ɡ&#�3�j='�Ղ#hz=�p����-��1X��2I.��=mŇ��Jwbծ����@�w�S)�����m�^9��U�gi��C��R_��-4�UF�����;�D��(t$����S>��0��쑀=pOC�sw�M�.Z��,2P�:�5��+�bD}L7�6��X�&TR���mh�|c"�'[���=�gl3_�_�17��t�1�se2���HaB�&�w��G�rć����wn�F9�U[,�?�B��>��C��nҒҗ��1C����@N��Ei%�Țx"C�E
N"�{:33��P���{Җ��#���l�ض�����j����p�����D3&�A���M?7����lb���6%����DW0W�%�=1���L%κ�g�Tj��D�盌��C�|�Q5j�mS0ǨRV�
ȁm��G�B�s�'��)�K�X�J,��X�ә�I��!�
�#B��Fp5���_��u�� �B�G�k����4�(Ѵ��K�6WOO�젨�i}"ֻ�鍞Ж7�
��9pEGsI��fB�}K�1y�>&�i�2j�9f*j%V$����vp�����b�cP�`-��;��(�
�n1��4�|���N�U Em�lL��>�2U	��!�^V#�}�h�"�`��'Cc!l�X��6lk��d�(9 v4�<<0�\[����O�uZyK��sS5�l�)Vp�٨�7(v���c�����w�����y����D����u|���y`ľ��A�;�ܟ�#\�.]5��Lv,���|^o6zsK D=�<PM׎����c{�Y�S8�}a�8^߽�������2�j2+W�L��d��1`5Q�6v^�5���1����ʊ��8ZE	�H�G�ӊ�O]^�Gy�rT�X�;�e�gV4�hE`��8|��$'��x�_�L\���6&�u�9�l���c�^��{�M�:�>��TN��Λ Դ}בGX�`>��U�͹���
�w%'t*���!8
�H �M�����0��	�B�[��`ƫ��A��s�'�HܓsX�������:_z��*H���W�X�P��[�"í�G$�0�	l�`܀��N����#8�r[W#+�/gE���솃K4��%�A�-۴>�lU�W0 W��!/�2��\�A���8,�rO�9�<����1���]6�K�HGS�dP/��cU6^U���L�M�@��޼����X`=5�)���*�����I)/5{��`+F�ߠVh�{�Go9���@��pD����i�w�$�S� $HCO�
�L�&�o`!h"۳Kמ��`n̝O#�ȍ��]��۹f�3�ѱ��˸�w�k4�b�Q�6��)ZQ��a��-����u���D��T������d{���n�{>�x�+��Lss}։�q>��NݎAN�92U������J��j�@���6��_5Xa٩E����5 5@�8��[�����A��}�E�S�Gu���%���S�����qV�.�H�r�e��_�ez��.�	��D�@
�/UN]T� �����U�̫4>�%VZ��S�uW�G�*�vAf[ͣ-n�6�#ÆOa��8��!|�2��oD%�`>�E����X�̺�r[=��a��^�}���bc�b���~N�����?#Fw$L펩�1�������������X!R��tٌR��.�T��� ��mJwc��x7XH���A!��12Gz`�h���/������k@1���*���%dN`�xsg0v�43����Xn��#�:�+c6Δ��eG.rFo~�}������O��w1�T����lW'���x@Hw�۪�]Z���bJ�H���b}�C��ʱ'�MBwFD�:��t�*��ԟk,v���u.V�ź�?�_O�l��?U�Xe �l"�?�`K�ȵg�ߔ��fi��.��#=���]�g��
���& �a�1��i �� �z_�^w�1����1h�7�;���D�#U��7��ك��Y��;<�m�,}��X�
7�4g���s�SX���)(�v�6΃���[)�'-W\'�Ȕ$�ɒe��#nURu����5h�,U4e�aO    Z�
�8)ʔmC����&�cQ�f�|��q�S����	����c�������=]��<���8,�mv�M	�����.\�c��^٠�>�L����1܀}�М*8�ƈ
�������m*��C:4c�J���2e��'�2U�T\�A��Y������zAɌ�W�0q���4�f�p��z��-���I	���O�C�q}s��:L0Ǒ�)�4�0p�2M����!Y�ǽw*�c�V�"�m��ov՛(VR��{�3����#�U�͎�yy3�s;y����s]�M��]?�ڒ���2s�?��{��z~����8��b�;�3_�!� �d�H����As+�Ɉ�S*N��I�d��S�a���X��)7y�DEKc�0qoC�{Q�n`�9pѦ���� 6��N�&8G�[x<>��&�9����~D��x�`[n��������{�K3�6�T1Ƹi��g[:�[a\�wl�8^r|����׵\Yk|o�ʕ�53Z�MZWk��^�+��Ez��)���1qq!���N��A`��f'�~=(��Nb8z���9�a����|I˰��:i�^�-��>RDvɨ%4B� K�H2�W?���Ǖ2�,���G�L����$_W4��8ISNRƌ��8����/j�t.Uv슪cO]�C�����d����F��{j��p���D��I����5�h����m�QAЩw�F����@����9�!5Co
u�NZ;P���>}�D�o���:rيwG��5^�e3%^��3����0V�#�|�,�7����u��wX+	؅��nu]hz��g�2Y���H����ELD,�ɩ�?��0����<:v�>7)��ZAC��2x/���BE�/
�LW.kU��_���sR�}<���]3���29�ā@/�͕��(_;�*��=����7����/�pf�vրt�;��D�A�,:˒Ӭ��?�vo����*^��6�2�H+��̕�\���3�(5��ڦJ�^�6��MV4+�V}]��֍P7 ͇�[��Gl.��cs}� �)����P
�duO%��ʚ�U{+�A7 a 	��EWd�o����#(!��481�;@-�A�����3DdS��-�/��x>-Z�[��y�K�����u[�vw{��9��l���b&M�:�����'͡���1>�ڤ��� ��)L��TY~X�g�ѻ�9|��<rFt�,����ĽF�=�m6�\��ă���A��X�Nfn�u<Pg�bZaI�	O���~V�oM����J"��?���A�-wp��є���.۴�¨���G�u�^3A��.��V�*s�K/��x{����Su�ʳ=߷Ë϶���5bpW�b�G*Y��C&������� ��?��w�n�y�?�<�>���?&qw�w�iѨ��ի�g���W����)�"pw0����O�ȿ�#��ޚ�k��b
���3��Uw����ҫ��P�9�Nǵ:�qT�]j��s"��\0�!�����0�=E�1�C�	���l][M��xo>z��4r-M>J>ài�n���n4 <�+�뙹���CL!���련�t����V�N�;kU�����4��A���dY� 0��&����33�v�,���#�D�a;Ӱg�P�)j�hvQK�7?G�N�;&�����O߽L��_읕#��D�@z
�G�@j��S*�UG�8bE{�l��\�����S~���E��CN�2o�P4x��b��d�q
cA$�OJ�MJ0�p�D���:Qh���1�xjiQ\���xC�0�$F51Ǥ�_��<�
�iq	p� ^����p"�c��w���P��s��X��`�ܽ�鄕���tVgn8� v�.�ӗqI�������u�Oݧ�ѱ�8%sE(|U�+h]!%o����.�E5��J��c��Ѓ����vIrP�%%9�RYv�ʥ����F*)�t1n�Mh������ؾ�֊Q!@��[�����1/za���<���d]�V½|�_$�����ry< �y����`ne���E�_�6�@s���õ�w�+�r�Z��=K��_��L66���f�nx�*�|���mI�Жl�ԥH�ߨ��k��#���F�'n`�2V��a��w� ���QPL�fs�-�MS�Ů����1��:��R��~~1��=����1�{YY�v&Q��uC�J,�����v����(V{�c2��i���%'���믰1��њZ׵�jA���B�s�m��V��B�<�͸G���6@|���s�h��}��Қ��)�Ӿ䠒F
)����Y��bc�8tM�]�Ur�T4@j�1 �?�8q��]�0�Cq�xc��k��kQ��B�� ���dHʰ�t�N���Z��IŹ~�VL�N��4�6��B���qg~��<a�:o�J����1#��r`1�M��*K.�"�������Gf#MRԶ�H�.�
�:�8]�?A:Hw����η�0pf3�}��l����#g;K���sa+�n4:5 ����gqdG�0tg����ܧ�û�R\%_�4c����"�αi7U�=����yȓ��Í����M��g�?��T^/~;~�CXb��г���3��;�=?�!?~Koa"H%>��l
ܽ�K��R�M'%����!I%EO�ʬ,���%��������QS�(���b�����v��_�	�3r���#a��F�����[�?�m�"��&dJ*%���Y�_��H ��:�nA�z)d��ȵ	����I���t����sBV�UIA���䵪�`�����c�E�F�odC�Q��EP���x��E�z���+XWm)�b�	��W�Fx��,Y	���a�%9�v��;Wah0X����`
OpP�i���?��v}QC������l�
��W`�����b�Cg��$��������#��a�h6�������^��!�{�nlƻ�.��"4�����٢�&���-zmŰ�;pC/��Mv�'�7�<|�I�V����w��������٣�@���ɗ�l����ԍW�;R _�&��V�8n��)VJ�yf�E�R���iW��V�C,�R�@4%6$�C�X��1��9�]N}��G>�M���i�$U�`L>+��>���(�\�;�M#'a3*�a��������O�֋�o?�������_1�aGu��{$�lr�!h�P��W�4�I!��@p|����Ar'ݦq-O �;����U���J\�:>ӏ��_���Ӽ�XԒ�ϥv�=��`�%P�vr}"Z�$���WD�8(����s�;� q���E�ԝ'��mU��=Ƹl��md�6�fn���uw7�>�[����4F^�&]��A�.�Ir�9�1��K
mI?-"�2%��=#N#t`a�+k����٢��`O����2����f�nY],��#���F��v@����{fa��}�i�"�� Bu��%���1?��A�l�iĩ~#Ng�PЁ�xs���V��cl����/�`R��I-C��U�̝��A�k�*+l�>�YRP�ٗ��{Ytp�&/���#���,����&�s^DZ����<f��a��X��tLd�(�S���ݛo��z���a�)�t��x���2!�н-t�K]��m?� K~#�?o��I�^VPN��NG����2�U%�q�.u3$��S��g���[��AF.I> �%X�n��A7�@��P���f^?���+E
��¬l=��I�lW�-B7f����_�mTn6O��^���č�&Q5��A�
�:p=L!���W\�a%��ʁ�'X$�J?6��4�غ{�0�ؼN�B�$�%���Ϊ�g��"�im�`�#KhCt��\�Q<��t��y��|���n��3?���'*=ԃ�-���qG��~�&��Vӏ=���|r�s�*!+.?�77?���^�:�����	�ŕ��w�?_����    K�wX�vb�a�̵��<1&�D�N.�}�y���m�/?m�����
�?S��Ql�(�����o&���2�����ڑ��܏��X��y�����!4��~N�5�����Du:�m� .G~�*	6�0�`V������ފ�D����23��2K8�d�X~"���o�)�4�[΄�[�O��UX����T}�s ��%[
�-s�p:��4V=��4c�&V��IS�c�|��u�����r`�G���%�*Q�.�!���t!tC�~�-N�}�_��un���	7K��h��X�����z��S��b���7Ҟ����w���[���2��A�����A���e.BCI���߳2��T����3�	�q?��gfl0@<R��hD���Gio�#؊MB1ɗT�w]s)����	+	�i4�5X���j5�V׿o�_�H�p������k�]�q�3+'�my�I\0M�Z�|}�[���#��/�L���^��w�k�)��Y$�qB�5��w�y���s�� ��	��a&�h�'��Z��n�Bn�¨k>�\(|��}"˚T?�6>*2=�$$��-R8ōo�(�kbd�T�l�j~�eL�F
~odv#��ͱh���3M?HO�c�D �x�9��Mò$5��������ƛ< 7��NM�)?\3����h���q"6H�`�_�ΰ�P�t��9d;��6��~,���/N�������g�r��,U��F�xgWz�m2?�ښ������o0�gμ[~e�q�x�7���)}l�gIV���a�6�Y0y�
.]��SY�����f?6��5n����J�L���T�#���Ss�\ǳc.*Pz�.P;IyÞ�X3f��l�L��
�!	z�z�V�R��,&ꙫ�ۥ9aB<j�f��4qJ���9��a��;a��\U�]S�K ��)4��hi(o�!�ޠm:D�������h���,v|��$�XU�l�X����ad%���Fa�y��C,�3*����	(�[���CW���];tg���-��uzZEK��q���z��"�]���#fÐ�|s�I�NW	W�n��~�e�7�n��
�
.z�<}�S���_���O����^�y[e�7��0=�pځ�؈���B7��Z%0�`�^���z�g~2� ���eb�����'(!���͉�7��]<h�������/ji�����Dg�7j��$Ix��o_�/ܯT��TY3X���!l�z{�m�h���0�Ol7N0ކ3B<��Hh/-rg>���ӧjq�ş�U��.���E4�
�uǉ��A͇A_���}&����{�s�ͽ������?���(��Nh���3�z�>�t�k�JW�"���0���������[���z�_�ò8�~�ahe�pZ�J]�$����bTɗF|-�����%������?��@N#�H����
SMc*ސ�HJ䝂%$}^бR�V�NK��cU�l(������<���8F�Vi�-�u"a���dv"�$��,�Snt�ui���$�09ȱ�:����8�mP�%�?�Ɇ�f��,.$����?<�C�~y�3]q}��^�;�ӝ_8�Mf��N������i4�ύpe�ѻ��g-���ג ��`���x���AU���{U�Um���(�(ΐV;a}�aQ�w����¢�0���
F$�k� �r�o��T�w�ZתL�	HZ* �%�R"N�P�"vM��3Pd�ʯ��W7��IL�E*����'��F�6yQR��Ֆ�&8u,��L�+�8!���j�/y������i״�R�v�>)��ӧb��J2��:�$���pL�`saw�K���]���H��?&N����h6I���ѳ�I��3�r�`�x���VgK+��8��\�(�(cܠ�8�Id�檥�L�@ l���F�&�5�
a1��:k�!����`�PyȬm���b��V'�i�!,-�OE�q��p���6��ck?Fy�FG[�l	�xݡ�73z�*3��������X�_1�$	�Q(��@�#�K��w�����D�1j!M+���k�^�mz�c�:���d����M(S;I�m�<��0��o}o��F����rL������-������+���*v�PVJ�	�n��Z�2�.��݀�l��"�-��Y��C"�T,�W��t�p؇�j64`.�3�&���h�d�I�ρ�E^4S�N8�H��l�]Λ�IC؍ֻ��S�'%��6[ʟ��E��g+�L�U}c�t5~5,W�W�p�?�/[���8C&*ݘ�P�$�G�_��7!|�І=�(L��S�G�*�'�#*[U�*����o�Y�v�1�JK�W!$�b�5)N4�\�^����ib�->潶XX���t�\(�9�{<���ĕk�68[1w,�?��o�xG�'�V�5o�5�,+���1����2�J睪�i�'�[�g�@a�~��y�H������ɂ��H�M�����2>�d�
_�6pm��yRXuPP��(��kX���]�C��C��\�Zd�����f�gA#J
��u��9�@F��oIa��B�T�JB��.�����Z���1l80��"�줘
���F�a`�&),���hp�Xs������t�#��Xŧ?T��17��� Բ�m4�$jl0;=AB/v��w�s)�7��BZ��@U����椞pì�9���o���(��~\��D	E����Ɇb��.#�)�G�RL���=�|���޺O���ɘH���R s�����1=���V�>�t2�?��ٮirjж[B 6?u�w-��pi�Z�?�#�}C���=U�n�CtӢQQ[	l$%\�ƴ�����Z���m�M���g�BMc��N8���=8Vi��I���,\g�(xt��׏������u��.6�m�o������zv�~�������&�X��6�s�9�Snk����ԩ	����|�-��L�j{���0*f�{�<!3u���_G1�aq`���NOs��o�
Mٔ�#n��\�u^K5n�x	돐'H����i�ۻ�I(�-=����	�JMc�<1S�9�U`QӅM����C�Bً�^�$���1��`t��"� ���K���}�տL��b!��k���}��A`8�݉����l�4S�#M��\���D�W�9�lt��Nx��\�*:�W�3\�B���\�.:�Bǩ�ޠ-����U&�B�{��u�<BjY�a���]�q��Z/�u���^ny�,�.�l�����3oX�!�~����[yv?}�0dDr������o��H:TH��Kt��^R��Kv��4a�§`si�^�ۯx-�U��Qc�D��jT�<�VJ�M�9�Yz���9ȜG�m�(�\͐��s����Y��;w綂Ů>��uD[���f�O��DE��ѧ"�v�I?�ft�����cJ��Y�g�QhG�ۃ$�ݲa���v�s�|{�c?�+�U�;�����[����s��yC
0?VK�P��Ի�������n�K5V��U�|˝O�H-���A~h�;*��^	�`h�}�$�}�n ��8T{C|3�| �(3�(;����N�R��Wzp�.��W�$�q�P,y�}"�;#��w�^ƫd��\C��ϔ��)[昫�L�t����ڦ�eQ��0L��*uޣV	���3]��F5��2q�sU2���]Ռ^a%D��k}�Z����W�>�6[3%=�ĉ��'BF�Y؍�F���R-Ǽ�����޾*wu�|��p<~YƏ�����FI���َ�m{��?����`;�������̈�t�)%L��TJn����R�|���G�P Fn=�Y��ù7zVΠDgx����f:�=�&�܎�Ʉ86�wi��(P��m�6��[6�	�Xqv�yӹu���/���+������|���Z�L�cj���i�NS��J�-D�Rp�hm*`̞)��	��\{3Q9>nS��,��+l�hX�D���~\�
O�K{>u�N�`������M�i'�IJ`�����on&��[o xlQw(�o��g�I/1�u]Y&��9G�`உDuRy�&
t;���n�}Y    �]�L��V���B�N`��߷�J��]�b��p������^��Ϙ�>7�>����yg���p� }k��1���|�sq�^�:Y��}����aw��K���Q�&a;���Z��}ǚ����$i��-?3%z�Ԕ���;r�s�蜺e���cٟP�f'���ϰ@1~Հ��L:�5N�
ѱˢ<p�6�O���_�),�}�/)�F��6�l�Y<�C��%�Re���E�SI]p"�mԓ��(�ڸ�7�cX�=gc�5����C��Ӿ{���)��@r�[��e�xU&���!ݣ��E��A΁ �p�v��d��"����7)����4"�/��D�W Q�R7������(�'�P�w�-�v)�ť���i�j�����㺞}J��!��Y���m1S2�S�~�lV�=��(�.���2>sz��1]�v�D�*�"o��d��g]*���sfv���y�jE��F���c���F�¨�)�T�L�-"�wq>QA����$�B���1<���n��Z�����#�U|�^Y�@5��>Z��6�a�?��e��Z��s���8�K�et+LKj�do�z0+�{F>�<��Ω���a��Nd�r4��ڇ�Ш���w)k�t��HvA�9.�!�o�(L}����<$*��
{�֢���o�0�4%��达.�e��$YܛN�̟ر�\ƥ�����/�%�t[ﳧʥq����%T��I���y�X��O�&�gnɈ�2�"V��æ�����S�	�}[�rMvK��Ʃߡ}�[ޙ~l�����J��9Q�H�um?�lMF`�&���@�&��]-�
|7-��a����M��i��Z���~1X��.������`˧�ez�ٮo��Ӆw.|p��/��O��cS��n_qL7WM�Nv���	+��N�0�q|�s�I��
s\�'r=xx��[�T��Ɇ�f��#_"W���E���=4?����3$X�G*�ٹ�K�V	b>W��aw��e�Td�0��J�~ku���u��`�q�9UI�'�x���8E�/z�ޥ�K̬������}�t[p��U��&&\t�^����hց��J�f�q*q�OSP��4�:_�cϵ���:��i������YW��B	C����R_f��*�8�6��	~�@�{���[��U��O�'q��~�g��N��%�KC��h<eN5��m6����M�w��	ҡ:��h�m�_;%#��C]�?!$�`�� ���)r�:}�̕��扠l�y�>'�US���<*�
)�-V����E7����p��?��pP��<"�t�t����[��J�����(� ��A��$���x�� �]�/�g��GP�<Y|�����B��M<�X5�0�^���k"�G���y����yf�.��հ��F�?k��F�4 ����N~=V�`�4���˸�����^`T�b߼'sF��:��m�0A����������$��q"1(D�D	�Х���8��c�s�
���?�e���-(DGS��t"b���H�������cƼ.����
ו1��-�������a<S7/����0
�dS��b�d^�j�:ۣ���Ҁ2n�����⠶<����\)�Jlr&����?��-K�ѽBp&�2E��C�5L���o�a�Þݪ��,N����G�a�!�"�&�2ީ�Hb��a�W��1�`s�<��f���؄A��PڵAx!l�~Fq�� 4���hޮ�x����D׆�F�+[v}?�Mh��9��7��cs��cfM�"m-i.!��w�SmKږUOr)�)�2a~�1r8K�ݱ1Q7q�%�rŀ@����R�U�rJ�捷�?������9�.&�fP��=��=�KۡtU4�L�L�����#���]Ļ����O���y�*#*4C"�+c�1���g3����
�F����n���\q7��&��D�`vg3g�!�	�7�ׁg����:O�Ȩ7������B��o���da�a�Ϟ*R��G:tǶ��42���8��w���(�U&�3Q*��l!��km^n�*�IC�b�v��3�z/k����hr�c�N�:���S$y��tUb.�=���J1!�{�5a��2��Z�.��ˈ�N)��\:��A��(vl�)��4+�(}�q���a���n�Dv��}�-��oH �;a#�O�W�`q�`uy�9�C]}��ݱZ��S����'� ��|���B�쳵��@r���]�=S>h,���>�i�*��U<v�\����%X���J�Xx0��}���'��E~�D�vG�%�R94�]���5�UO��J_�ql�����ZT(��Ɗ��#��Yq� `n�T!(��M]�u?5z�ܘ,+��sf2���vJ��U�a0 p�iEB�山�.����}�qz��$��jQ:#���iy��@��zM�a�պJN�����%�p>�`sb����]�1C�	�����7���_�!�a�R좊��܋����G��лF=Bx!�m��TW�D��9��]=6�O�c]~���Y'�������So�-���]�'b��p�/���y[5`0�������zM���P�M�]�j�`�����"t���+�;QL��_r �;�嘳�����N~�dH<��	�f`��/�ښ2�_R�Y�D�EZ%X��Jq�����(��;�(険��� ������9�>v��;���+��G;�q�����0�po������d����@Ym	�Y4���,8֫�A��O�A��A�8gM<�zj�WL�3�D"n�é뙴Y�hDv�o6�Z0��#�W{�/�o_�8$_�"[w�2�3�+�W6E�H��:�Ŀ�fwj���)S����	�Am����tv*=z���r `���\\�ҟO�� 1���au�W�'�� ���{�VvO��+<Jh��0�_���.�]\4#mF	%*��T�0[l������8���U��p��{x;A�%����e$3:��q�upMnK�?�*b��z��
~���o��쇡=k��C�1T-�$�4�Y����f�	�fC �	��T��x�5H��c�w�	/$��j�
��1��F�c�*�G;��l���ie�<s(��N�H��a�5r��G��^�l�J�~M��9n�nrU��.bE����<��l=��1��Rĵܵ5U���K��u�&��3����lcXqC��$��}��O	eo����ضm5b{N�5U[�zH��^h�)�Eg�#����չU�8�r`�ک�V
�.�'b��\�o�s쪹B|.�2X�8���������0����
rΝ �����E��*��{��;�����h�8�3�p{��k��M�7��>�^B������_n_�j�qL6��_��U6���fHӵ�uC03��iW�y@�wl}��e�~u���J<]k��J�?QqZ�����ˌ�x�H�:[�{�:q�]Wd�ł��r��*&�#��M=�T�ɴB�����P©��h��x�E�̦<ہ��5sFo(��*1�������[�G������,���c~M�H
V[R�O7B�>I�A�Ő3aK!F/���tՆ<hIy>��UH���4�IEb6��Zq$hq�P�ն���4����]�qW:e$�	c)e������-�������1�JT@�e5Py-]�|�� ����(���В�A4�99N�UT'�s�mLq���s��k+X�_��L؟�sP�&c�1�
��V��dP��NI��1�D�������]�c�����!���5�͟`��m5�2T�@n�	ӫ�y�����Ѓ��Ԭ+N5-7��J�]gMYkꛜ`^&U_jj�>����;�_�Č�(ڵ��K�����ýӒ��r8L�~Uq�"�*�g�����!R���S�={Z���wB3/�T���]+�Fjg�F�bJ�3�쵼�\�L��#e�+�ݻ�"ό˭�C"嶹�9Ǌ�]F�=X�Au՘�M�̈�e��b����Y|<a�<���%,�B�iNM����X!t�L 	  �Y䙖���]痎;�Tml��c�:����E3?ԧ�iܬ�_��`A�WZ�(`��ml?t�������O�����[�s�G��7"�v١g��
��+|��s�ݳ��3�	<w�#(�l0
��#�=�xMÙ��	���j�j7
�yD�A�
�8�QT��?R�RU�+�@IEE?��+��z�� �2�XY��b����(��,����<٢L$l\&댑]Z��`��pS!�H�)�X�1W�qу\��@�� "��Y�'�ޙLBK�2�x�,�"w���;���+j~�
��ܸ�dh'�D6��g���Y��<��~�mp_�^�#ߨ[��<��m���u��g��dm�>�*Nw��u�_�x��֦;�`^�����k���m�_`����f�y��D�k��:b���K�EϿ+�����l~��n�f���?�M�$�y��:��`YoI��d���r�:]�`��U���j����H-��{M��dX�������QU�'&�`p�v҈B���gˉ^�x��;�&n����P�~��Xg�g�q�r���T_65���`���'�>�	��`��Y���n[����@(�]X�\j�Tg'윥�/�̋Gq򩵐���<
#6�8]��	��L��ě�vp�F�_KX���>�Z�~�ݩ�s�54�)�llk�S*�3�8�J�˃*=
un�{~̽�uϜTfL����%Ynҁ�^��~���e�ۈIGq	�w�a�/����a�	&�3��QYS��6[��3�N,;i qv��#�fY)Au�-B�Ì��}�s�]�\lXb'��[m�O�k�}��4�m� ��a�|+9���|��f���ۯ�,���g���[�[]��'��\oEQ���S�k����ћ��<`�#0�e����@��tU���5��b<:5z���}lCr;�õ�q)(��"E��{ [3�4%/���'(��2��������l�ǈ
�pE*ޟ�ڊ�8�&+��F���8�����lT��ҩ#�ѧ���1+4���3���a@�"b��I.�x���x��,߁��P8��݆>O#�+�
c�S��Η�n���ax�����j2�K���-¸��NԱ�b�P��z7ul�_�����؇Z�;~��q��E�U\6'J��mT�w*}���ZN5�;��a�U��}<���Z�i�t�(|��!���'m#��Ѻ`��Z�dk1 MwRmdK4�t��o��"	��λ�nG�oGx��)n��$��3K&�9�8�𵲹�Љi�2�_0����䮑f@�U] ߛf�"�g�2�L�����jJt�r�%̦ㅽ��7� '����6�9�(rr�6�aTSF)1o� ��R�?�z��ċ޼x��::���
�-֍S�sl=����F�n��-��x�<W^;���8�	��A2uB|�Z�C�葖){%)f4�&Gx^�[����޿���!!d=,t���ī�\��H]����]
a���m�Gw9ޗ5董jx>�lB�M�A�
�.�:�� ��H���y�n�L*h�-ܱ��;���I�/;���!��n�����������?��^�/�C��at�����p}w��Z�ν���nFC�h�������t�G/1~�B���	�=Y�mL���t��ð	�D��"�%�ܒ@�K
�ixܣyUp5�r�>K�-�X�*+�$m�(�o����҈��_�,Qb�
���Î�r-�I$�"��>���@�|٧Kl��X���c�ZR��1
V[�4}��@%�����_����x�� �Y�1�	n���\m�࡜���QINAi�FJ*Q�m�A��b����i�d�m�1'r����'��X�ߍ��� ���h�y3�'^�o�Q~Ph=�nǶ*�Ӎ�9��A�"���i���5妤B��k�QQB)��u-��Z������N)� ��+�"���*6V�i�a��5���qo���T���2�EV��׸w��z,�_�53��T;`���dɮ��f��3�t��>1bi�m�kK��"��P)��ҕ�$�		dw9�XJp��{�k��41�=H�=��?',Y5n�f�+鰠8�����d5��bk�m(���9}n)uf%�0��9RM�� ������GA�Em �� r_;p�Z��N�0oI��/#�Gا���OzQL��#��	��+�f2��y�u?K(�v(r�������4&� }TX�u5��B{��	����7V�FS'4�d��_:�S� 5[|5�a�eՌs����w����j      6   @  x��Իr�0��}
�̂�����ER$�I�F��E���}��l
�I�3�O�_J��B�d�����R�E>k;��M�h ���#b!�'� G�XaFi�pvy�@��$��scuJ纷T�s7;�:��.d'G1�q�DA�b����o|�L/M����ѰJ8xtViim�]N��=\�a�7\����!����Ζ�s�r(x2�_��t�D!�qE�7 �K�|���Z^�:�圮\|*���I��S�I�J�eFiB6�q�,$��\-�0���d�X�Yi�9���K�s{,#$�)�xK�ұ�)J��VX�Au������rԽ�S�PI]�]���n@����&e���#l�F����.\����6�u g�s�i�r��R������Ձp������¯.��DD但2�\Fd�!
be�J��Z#��yj�S.�
��V��F��(����`���������$����Du��)���������o�+H@Dp�y7D���^��m96T���E.?ד��w�c�(��i�8���ƾ��iua�f\����p���Z�      2   �  x��Q��� =;_1�&`{q|[�VUm�����@�c;��7qv+��� ��F3��c�s��P��ي}+}"D� F��a�rR�4��!W��#@yU�*�iI�L}�=���	;m�W �8��� ��i
���Q�k ���(<n�ޖC�]�4���a��b0�k�_�6�������H��u-C ��:M���2R춍ie����t���2?�g��t���U�˷U�|v��v�J�zJ�W�nP	���)ҌeTV��</��2����58��R�����?��}�/k��މ+�M�e��pЙC�kN�n\����Pf����$^�经mo���}�]c�}0vN��Ќ/Q���p�����2,j^��j�9]��      :      x���n�ZE��[<0��Lmf������H�:�9U{�eu��P����4�p�s*���J�B�2͑'����E�b8�U���pN#TPYA$Rd��(\��������V����-*���4���ݞ_A�lH�4��G���ķ`	4l�<��C0��]*/+�)�DptA������k���x���g��A^����4��	1��qY�d�]&x��T��"�a��k�M�� �1�+q�h��	&*�L;�*�@��G
��KnG�B,���	l�M�V�I����NŢ��:���7��ӝ��m�huh�M������R�+;���H��؎Hۮne�'�D��Z��vù��������M/>�"��&шr��\O����rxD~�b��47W�y]�E�|��=��r:Wy��&��;�4߻�n=G�eW9C�Cd�:��sa(m4�5i{>T_B��^F;���{�����'���N�Hs�#��	��rY��و�R{�J���	�s�����\��"�e�����z�'���iS|
���q]5�}q��5����z��u���r�����\ �7�)����y+o����Vwӽ�jC2�*sк1�*%%(����<vʉ�4�u q���w`�Q�(J�.ˏ��T��fm��x�J���,��
�c�]t*O�Ғ�	X�����=���wr�iROѦA�ǡt��ҵ��tCsQ������������,R����]҃�	Z�Ԓ'L�{|7��Bx�ڑ&�#�	����e���C��k�-K���z��^�Q(����ʩڂ�*��xv�\�R3M�xI���������x|R�@�PRK�R��7��vݨK����#�oLJ�R�ajaKB�$�N�-��w�+�Uw	�������/Z#�����d�B]�_�!�
����ZG�s�Xq��R��$��B�[u籽�� �G�wD`�!&^��Z�,���c��8N�N��V��̞�4�ބȮ�EPC��%H7�vـ�pI����{-9��=�Iޏ��U!ڣ%~����g:$-��QU�LU�����lH=�*����Һ����2H�S�#�&�%h~OA�<�'������ݤ
|˄U��pՖ�[B�Xx�S
��l�#���U�j8w���;�D�F �մ����{�h�Z��uf�R�_����[x������F�R}RS�[�ۨ5��}N�o����ꎕ��Ƙu�*J���9�^�#��!�,s��8�Vu���3��^}�}I���N����[��`�,�?Ə�/Q51���%�z����Rz��3<�;R��S��̍�R㼽ڼ&F_/��n_�PbNB���ۍS��R��/�Z��f��V2x^2$�4�>�V�:�'j��A�5��4Z�E<y?���f�Ma�ޟ�j���_ވ�=#�����ȶ�M��M���6<�$dC��`>Fþ\1e��@���=�&���({��"�������M�\ӟ�\���]��ݟ̑�[��7ԔXj��r��'-�'��P���B{b�m7�r[�r�����rt�h4�0���� :���猢��j{���:���(��$]5~�ĳ�6�aoQ�7l���j~��(?��ؐ��V[@,�� +��H�&I�^U�nO!�mLJ��i�> �"��Le�����=���ş�}��tY��~'��m��v�IL��I/����ĕ2.�J3Q\l���v�A6�`ff��<a6[��*~)���N�>Ӈh�����@BS����{���_��T�L�7ߺ�W]��MN+Z(~R�^�o��٭	.�Q���Lܿ��E܂fSp�]�Su�w�+z�- �`8�����g8b��┱�؍|ԫ�7�>��9"~;�<��gT*r(�'a��YĬ �D�=v������#KP3(�Mߚr�8��F3� ~3��|�rAW�ޤ�Pl�Oy���u<�Xq�h�������a�ɩ(�o�8�6wJ����'�����V��7jм]�<�P{�6��m�IL���2������-����@A��*�1�~�4����/���+� Py謹��i}�[I�W�����-��5��@'l��]���2�c�t����"����N7�� 9�Ӌ�8FwCg��u��j����x��W��=���_�e&A8����ݸ�$�$uSO
u��b`Ҥ:�x���o�E��A' ���D�����3��d5�F�v�-a���d�o��CC�B��%�vIm�R?;Q�}��;���;��=�a���k�´鼭��^�Ԩ�����&�qR�>qj�B#X�/�a7+��߾���$��J�a`�ǽ��cCt�Rz[u����|�]���\���,�$������.:#7�n��W��w��5GV�̞5�[Fs���C��]܁dl}O.�J�Q̺"ɨ"1 #e�e�-���å���}"����5�y��k�q��C�ϓ��X~R/�p"\y� �f���\~����0�NT�o&16�K�C'p�(�&�f֘Π(iW6�����w2��n8~�n�f�*�(�JM�S�7��}°Հ���-]�H���zӞ�3O�K�	�Ȥ�o�Y?��^�I��:��Ypk�Q�[R\~0��Z�$�j���0J����y�:�hb�!9Gu�bj�Ѳ�ވ��Lz�Uv��53}L��7O��!I�wb�ްn;��Xڟ��m�A ����o�va�9H����pz�"�RMH�~'n�e�?K�?��u9)��}��pN�(���6\"J���P��aJ(/�����^���6�^�u���_)γ[,{� ��&S��iD� �BG-�#�,�j5eY<O�n�Ǚ� n�~�kmFR�ٔ�EFf͵ܘ���b�'A`���O�С9����e����xX��ؿ'io@k�!+���W�N)�e[������;�X��Zh���C�/�{乧�l�����)j?Do���Q�8|��k�)��[@�9>����͈�/'d�նA_\���4yXp���r$̠����]U1'�����E��<����#�����s��2����j�|d���x$��D �@����A��k�Dy��!��7Jh�a����'��[�N1������ˉ�`8��f��!Ɍ���~\�7�)t�ԟ��c����)0��.*��1����]��xц����_d:��Dk��~�B�\��������$�����t��<���>�Ț�|�����;A���`_�V,��j8��VpN�hݝ�PEu���/�u�����X\���1��S��!T#g�˵���)`�������b\6o��߹k���w϶�~@S������ R�㮮�QTj{�X���o�ј5Z��A=�z~��<v2eN�Սɳ�Q�?���	Y|����5�� Zj1��c�x��Q��a��_˖]����:��ԩ����f�2,��-�/9o
��\o����)�:6��Q.8]�+��ii��J9`��B�n	/��:��(�a[/8d>r�Ki��u�-� ����I��hK?�����Ԁ�2����MNFJ#6t�S�ha
��Xk��Af�{Z��x7�g��B�V�\�Jt� mZ�S�tM~1��3x��U�'t:	$���C��"v�G��*�u������)���gtͬ�h��$��G"f�����N�{)l�慼)��	wx��A����W}�cRk��K#��3���{��:��jS|�œ�5�~L�R8�SFc����,�O�3�&�vP���%L_԰s��(_�*�a�z��!0{aM��Ե�m�Z��:���z�t���[F^���S��e��zy�y�,ǁf�2�}a��Y
�E���B��j�WO��ɻ��/�����gYV'g�:�/3zYzDIk�g0zK�Vgstc�#��+��|�����<(N��y�r�M��9T7��ϱ�uV{?�0φ��z4����~�m�����Gg�N} H^P��>�m�s)�Y�EI]���#�ַ��մ��B]�� ��P�_E|��
�a}�0ɜ�Q�x�(�    �H]��
R� �y�f���.�N%���0V_��z��:4��(�%�i�"�N��a椗U���ߒJf�����'Z�����jC�<������lQ�P������W�І�n����Ж�e5��H�t	;����<���z��1-��ePI5�\�������P���g�k�'?5���+ר͙ys-��,0t�c���Y�<$hxd��2��*�to��HC�m5s���RR�5�x�%	f$�(����"ho�N>�����F�c�7�F����rTЭ��PȤ�� ����X�Q]U�ϵU�xJ� h��AkA�lQE��[��?�/Q!,�/�r��G��pԔ� �!x�����q9J:��-�%�3�2�0�e�Q�'<į��M8�?�1e�����#⡻{~|''�6�&�~C0��;e'��aI?#�g�-�"�HZQv�7?݊�xr���� j�q&��̝xc!+y92-0
#W�o�|:B�5�R=������ǁB�c��ʹ�ԋ|�"e槱:Z�����n����}(����l䣭!���V�^�>p��L�fk6B�E��60t[`�aEJa�M�[o��{2�Iov��P�6��lST��E��G#�	.�(�-�����f�)�h]u���k*6+���O��b�P>�)o�<��fw���p8�~d���,jb��B���bJ�%���IA�py����=u��P.��sV��e�\�Ԏe�t	�QRԏ6�E�=N�+�|t�]�T����8�p�Ga?1��?>�Q��ߣ�89l`��B�S@8���6N��X~,�*G���邫̣�B�/�de����)m�S~�~�I�%�.k:կq�gi��&9�E�hi&���YS�&\�㊴�[��U��+��х�dФ�Ջ�{���H�9:X���2#�c�SP�b�x:U�_��7ۑ�ˤTaH����Da3 �X�E���) -5��0�Q��YL��o��U>��#ЦA�c�V��/�F�d��!�
����zY��<�1����y5��5�Z\{>���\�p|\M�Y��"�J�ɭج���0�"��P{����=��Z����tC�+y�ugܿ����Qڨ�ǳd�_�NMaKY�K\m'�Θ�t����h�|������:1�!hT�E�7�G����=6��p��B��K/���uW�Z��'�ь�Z�!$���; U�0�����+�;?rHe�7jP;���u����+��]"Y������>�mɏ!�`9�'�
D�rl���}=�bx�;�G��*�}��A�U�+�{�"�� �B/*���!�.قM�ո�>�pk6B/�M �V�����`��cj�TV��Uz>M�.n��w�Q��q�yp3߼�Am���_�y��Ly�J�x̔�H����B=&��;O�ğ9\��C�-��#���/�3֙��sC��WL����m���"i�gAMm�`@|�J��Mn9��H-߂�L:�3T�7ۮ5����]�3͖e �N�;+������Z��{��@�M1��^(2\y�_���G�`�9}s���8!�2���˜a���c�ρ�����h�e���)�(���8�8�a��>�Q�oJ�3L��V�^���6��A?��j�I��1�	x T��|�*~4N&uȶ
r��X4���X���8+�!zP�p�`Q���ږ��"��aՕΖ#V�Z�m+nZ�',�ݗ����X�/�P6��5[C���">x[��ΛOȻS�Ώ����v�GP�����C$�`�:࿳.�
��^sFyjH�L��U
��!��X�M8T����;#۾��P��=�v�#�P?�ɑ_�-?��u�G��G��[Ŀ+(Y��m�^����
���[�j˩|���	p�E�c�}dw��k-<z���Ҁ>�pq�O����j�ْFG�b�������?�u�}ڭ��"��r�����I�`r���P���-[y��`���4ɥ`5���q9гٌ�O�Ӝ�P��+��o"kG=���Rx/����(��G�9�=��?�-������} c��I�M���B��6x Q��?ӻ~�s֜�>�m\_i5�E.�Y�zQ�n�C�iD��s��߶���f	������i�]ܓmMN���r�������}��&�}�8^�!�Uw␃��`�_zp�k�6e�P���tnH`7�<�\!9�9e�/�Bk�q���R��^��L�����j���� ��A�,�J5��yq#	�G�;`m�7�+UE*�I����B��Q>�ce���ᑱ����^q_)�6���u�s�j��ׯ�3z�k��:��j��AgEa���9Ng˗[�s.M^$&տ�5oN�-%�}�*!�E�eC	~ڑ���)�5��+��t����&7ZY�ywb$o��4j�461��O���D-�hV[��f���l�qOG	:śb���=!�;MA���Sf[���e�Q���y�$9H�����(�/���Ȁ��d��'4��C��I����'�Q�vGDɉ׏F�O�OԾX-C+��&��c����>'�*�Qy�]v��y{T��z�,ӈ�Q�5"��bY�W��B�Wu�.߉����mL����ނU�����O��ڟ�Ea�T�9�/�Q9�p�xr����)�o��$!�q���pˤ69��4h��n�U)�A	P݄��_Д�ݾ��w�m�����`���ͳ�r&����P�L����&Z���wT��g`[Ǣ]!j���|嚺���o�ܫ�������tK�N�Ao�
S�*��������;��ꭝ�x��^�֨H#��(���x�~��t5!�����T��K����!s�ݾ)�݋������iJ���<�E�ti�,	,0�_�}�p��G0U]�A�4����H��b:���"�)��g�%́��u�]˼߮���}P>�����F�ۨ�s�����#�)�<BG�E�4�А(*�:��y����~w�;�{��΢gMg��  ��5`���N�h�J=̞cf����f	��Yj���띣*R��/q����	�R��+����/o�Z�U�ןş�{:Ѩed�e���A�K�n�35L���,�*9���&�˫⪚s��u�1����(,iH�X>�$ gʞ�VQk�|�V��P�c�D��VC���g�0w��6�C���v�s�܄~�<�Y[��ɾ1�?o�F	�r�y������!ގ��T#U�,:+���KE��,��O`�g���+/q�Q1�[>��>q}�Z����O�f-;9�\�B��6]��˄��D/v���(l����R�qR<Rۀg��n�嶨rY��l�fBs�Z���ʺ���'^  ,���9��s��."�惽j]_f鱷�:�W��_�c�.4ω��\�r�;B��i�`���"yf�����cNR�������������+����A 5	�xy� H�+7���& ���vO����yT��/3k�j"�'%����$c��l��d�&�L߿%v�G�۬���,8�D���t{ή�AS���Y�b��c:bPE;4e��9PJn�M���q�`H�6���U�v'��B�_k�&���T��@���.'	��߆��V�������#������\�@�����eJ���b���Z"�x��L��eԈw�;��TT-�s���
�e/\����W�P:����`�z�<;$�/��,릤��qd(���u
����>uR��e<
.5Vۮ��N�i�+�kfb�S�'�� a���J��$�>;�
��_Ek>
��K�����Vds����D����/��/�@��3IJ��MiX,�����;45
 h�>�� d��}Pi<S��>J�1�#�s�jpKy�lV�2xi�~v$��	�tV�[�>w}���p��_�_�h,�y=��>qBn�=�R	���.��(ON~	X��>j�Fw}9��V�-�M?���˨�̅�/~���N��    �N�GZ1.�k>k�
�0H;B>�)p0��ןWN5w5J
���Uр%�ry6{*e\?���/g�����|�ߛ�q���B$��Y�	^�C��|��}c��b��SO���#i{�i�mF���oD�ǞS��-<!�2:�F)	C���.�]f�$J.��Z����T��2zU��RY%�H��⏌��'޾9�\�ߙR?����8�9i3x4�����[�Q�����M���'�՝�p�	�!���ŝ�,#or҃=�5�X�!��6��뙍����F�mB�IR�a���}��[}@u���В4(���d�OdQ FƩ��I�y80������y7%ק�G~��E��P���p�$��Z�N�T{�:ԣ�W�.baJ�Yy���K�{{�]��,� ����_,��[�ݶ
W�,.�n�w� 	 �Dd��dLFI�j�D��f�y�\@&����O��;
�V�!s�E�o�ڇQ��/�K�O�Ĉ�k��2Wt�aI���a0��A?����%]�>����xD�O��K���ލ�u��*~�+��b~�Ss��]W���X>����]-�,h��*kF��1h7j�G�"	�_e����ѕR��>�3��ٯv��ae9�w�,�2?�u����;��Y�N]���٦Omv�)�Rܷn��=��e(���w9��¿�c����͂�⹿p�U[i֟�#��$���Vp��,�C���Yl�1��P��_Y6�%���y#�zM�����Ǩ�ȧ��W3+LX���ۆ�-����eS��{*�LA�i�:�O�h �#��_a��?f�E| yqP�@]��SlO�D�B8r���̂�Hq�գ����
�0��˱듈�XCP[4 ƍ? �Ņ�|�x[k�;'_f%�Xf6�$�k僮��%�jr�6{b~��Bg���=)��O����Wl�RS]���w��ш�&�u9��`څ:�_$Eqx�71b�ޗ���<�^°(p]�'�u܍�F�� K+��yga�����ӡ�TX��o)�^_�/j�������K�l�P4���AlfQ"�I��uȕG�������|�1Ȫ�(�ߥ	�@���A@����v�.!��:y�~���d*���[sy�������1DTSw3���a�g@�(|�|@}�B�(k0m}��"X������0��o-n��u��H�+��;e�VG��as�\�x9��+|�UM��VP��N����&�R�1s�����'��,0<1�'k~%�3� ������:�\��^3�<^�%��X�8;v�qH�2��^&�m��	���#�,$���&�E�E�^�C�ujW�ݟcU8�Y���1R��2�'c I�Q�*4V��ݶ�<i����ii��*ט�n��\��C+^yr��^���Fmg�����f��tx��ߔ����>*�b��Pʑ�9��c����ϕ�]vX��Tݞ���nP�CUN
�rt@������r��O^�:Խ��R��Lt[�D��TR��-��6�=ѯ����Y����K�a����A�ۃ�?�&!l�P/l;��MĠ���Ʃ����d ����l��u=]S\���gg�߲!Вݑ[SMk�Y�Ar�5���	T����3I,�3g�q�"�<��y����P����ui)����R[�H�́"P���=I��*ӽS�Qg~� $�թ��L���_�M�#����.w����^i�Vj��S��[��x�Z¯�A%�̓��߮��Ep���Y�CA�"������govf��i�,�,[����]�Pz��Ր�ŝ��I��jf(������q2�Ԋ \P��s���n��[Ⱥ�3�[bU/]�{r�����Z�eގ�"o`e���-���������b!� �;�C^�^vj�F�ٗ�Wq}�߸@�|RG/sZ�o״{�o+���LK����ӂ|�k����(�I�j"���E��g����Ajr� ���N����aV��.�pի��">�<�Q�UF�z�6��Mvz~x2�	Z��w�qMeS�������@���M��N�EH�&��^*w��_�:ԕ�� �p�;\��������0S⬓��ks�!.a��Q�V�����u����<)�/��R���~N%s1�^�����P }@]#Mb�7L�T��B���S/w��k2GC�E�LZ/�l���� �朆��XU�.\�a�s�~�u�������v�^8�#��g�T�G i{�F�Ҿ_��p�Ե]�v�d�m��9��&�.+�9�+�--�|���s��K��q7h�H(r�Wv��(?:[_B�6���¡[���SB�#Mx&s�-���`�ߌ!�e'����Fw��K>��RA��bO���"%�{�ؖ�r�烰=Tz�MN�a��Z���ƫ�����>�w��}$Po�:��M�� stv�o�	�a�P�y�6�O��%�q�QðG��ڭj��h�LV���a��0���=�Ur e�����g6�%���D��#'�M���A[��.�j?���x�fL؇����R\��`���cP<�{�;�[�U�{��@ל^���_uCH���I�X�i>���9�ֽ�҅-�i�,�u\��X���d9Z
8��r	����p���n�j%�L�'0D�|X<�ݹ_�"�4q7�����U��鉉>R���yto=�}+���Nb��#9��>+�x�!G���ffHw��בjd�V��Sh*^���v�װ��뽅�W2�q������g��>+$��h�ZI�_F1]TC�W�mn/ ����h�B��f z����/f]�y���.K���EN6R���L�P���jWFh�m�`Mt磝h�MĻ�#6	���� �ԭ�\tG�R3V�������ΔE�Xp�aߟ��]9]�g�m(䲪O8��_�X%J��J���CA `X�%���W8�(�neݡ��Mf9�~fzp�9RXB�@�X���?����^mC��>�K�ɹ=��wW�M)YK�|;n�����gExI����k]ً��p�Z�ʛ��]��B��|=��:�%���X�[fk��d"?��D|��t#�Ht5�%��{ ;�P	���(��I��[���_1�t�@��v=���9ҁ.�Y��z6`�O2E��<��Y�e�Q__8g1Ӟ0���z1����Aϲ����Gb��tӱ�; 0-�	C��AlG/ڽ�g��=�qUσ��u[�s'e���Y�5�_爌c�/�\Q&}y}�K�`��� g�AP'A'�������#G^�3ԓ%�y�o�y��?�#{������`��n��ϫaѶ��J�f2E�����IO]v/p�A���N��R}N�:���Y�g]���,e�8��U:n\��U��,ᐈ�.o���%���L�������Y���y�4X.D+��B�p5�0f����C�������6b2Qz�t��C��]�2�f��?Z�e�Dj��L�jM�rَ�r`=���I�6�k�:��0�΄I(���"��I��$��S��g������C�?����ڌ�6�nk1���W�'��Ro�3T�#}y��P?Zp��Λ�b�*<�$��y�nv����`K��3�y���bbz�X�#��n{2b�z�EE�q�ߟ(m/�԰�Q���5�d�@��A�}7T[5Z����n��Y�:Ó�H{�{u36�aa �	�-؁q
����]H(l��&U��/���0����p'
��������_�E��n۲�^d7T�7N*�HʚB=����:�b��e�x�B���`���e�
1���i���4/,�V��^ܐ��?'���Ez=�k����\�\��a!�Ƅ��7`B��ҦsU�ʛYq��
�Ә�gk��o�(�o�<\h�����ջDYP������=�����&�9&��9�vw�"��q�����>��X�N�vq����Hɉ��20u�o�j�������R7� `�����A̺y`P�}:.?��P�e��R�    �ܫ�%�+z���i'*:��Ʋ�t�e;x
�m2���MI�
�Ry�����A��Q���r��P��Q��?�������r�(	T���n��n�.����`������e��D���"��$�bZ�ROnO��'���2��=9������E��V�*���V�K�A�<Q�Š�l7��0h9�D��#��m����{=��Rtz�;�Zծ��`7;��$�c�vP]�ֿ܏�ٕB]���(�{*?a�C[�Ņ�JL$�N	Mk��l��:�@�ց|�^T�\#�?d�T����(ʇA�sY�.�HC��8G���^U�����5Qb��/��I����!�����q�7�\�����)��2��r ֤q�^'ǹwQ���+6����h�j$x������[�b��h���/i��
��ȃ�xzU[�XY7���W���c�A(K�랧�=�M��fA9g6]䜣x��� �]e��{�9��Y��ؔ��G~����ߓ-��Rr"d��mS�;"w3~orh�z�n�=��J�ȵ�)��ym�J��#bZf�p8��T��x�g�i3e��g}z���2�5|�VTCa��L*�sm9]5"�;���%e��}t; ����ҥ/�;ڻ���3������X��м�ܽ�"o;e�j��1a�jKx$�>��
����g�<��P;�"4��ij������A�ג_#�A��i�2�t=ж�D�l��?��3�;�@vZ�l�T>���S�f=�0��7��^ҵYJL6��]�17ñ|�,��ʊ$m`�p��d{W5���~9���L3չ֩	���ﴸ�������|~@��G�S������u*�eg����t�b����U�g]C�-d�̙xKI|�r|;�� -�r�2����q�>�
,a�#H�����ۍ�][���$��9jR����*���)UGشЪ��B�M&�{�.�"�D�?S�^�9/�t*�@#d+B��C���D�uQ3'�^�b�T�1R�#f�u��	?�F������oA����'{����n�?J��s����ܖ�l�D�C��&3����}���|&B"�o%�������H�#�����hD�Jʾ`E�'�!o��̠H�^���Haᛔ�ݨ��5�>�k�c�B��3� '��U���L�g��~*� �%�"��A�,�Dܭ��t�
SN7�?3���4\BW���N�i���fP`3����\<X���[�{�o�k�A��u�[l��o�0�h!"Y�F�g3�	l<{���_�� y���,�6�b&ӧ;Ѫ��W�/O�{Ϗބ:��U���*2v*�k~o�1��ɧ����ѯ������x�l�xB�a��>��vI�/> ��*dչ�;�P4��%���㝏QLI]W���F��;�#�N/�0[eYp?���S5����E�e׵�zq�8b5c�(͖?쵖$q>�h��z��}�z�L��S���I�K��gp������W���wӤDp����
���[�ޯ��o�9���ߐbb��d�Ù�c�1�M1RT3����̸��D�1">K�L��� ��G`b4��!�,Gy9��"Ǭ�3���D�������g�Z�%C=fu~��GjF)�)	�]�v�h���A2D0tzS�w��(����u����ԓ��<uP�\�:�ƻH�4mdqx�X�W%��}�|܌A¯|;���{[�ڙy�	�7�E�A��������ɍW�4�釺�v�0�Ww�[ssۊ��07p���)��\n������28l�|��eλk�O��f�BMv;X���U�d�w�r���(��l�h��²�߼/ͻ/o����=Pr����:��w��2���O��4���B�;uE�ģ􍃢4��h��הTbSOl;ŵ;�9T+{�P ����[}�h.�RQ-Dų|[�,L�w�6��Ƿi3)+�/�I"{B��*�%z�3��G�e_Ҋ�\ٜ@#
 ��6Ԅ͸�s
�S��������VtF}`8 ��+�W�\�pd`+}��l;L\�R�/}�G�wq~�?��5\譸/#���Nu���d��-ݴQ>ăx?O��F$'������&���Dй����@�w:_T�n�=�&�z��{A&��<���ݓ��,��K¦M@��&k|&��J��g�5�~B�US(��lr�O�ZI'�	�ֲ��4SF�s�ˁJ�\�:h!�5忄�yF-���f����"0`��֛g�x��r3x���v�	}! ܽ�$�6��w���1ҩn\}�͛�����4H����~Q@��%m| �b��#v�*� ��xQ�ɛ�~��'f<et��h��s��Ѡ����NV9&��&��29�2�d����5͸�V��ê�������Đ<Cia��B��F�ߋ���=eSu�o�_M;�?��:0Ql�a��I���JҤ��"'�E@�y����}���2FQ�/�j�"� z��Wڌ����a�'b}ܗj�w�G�PZ�g�@�ӷU�=<��{�b&Q�:�L	���7G"����U�l#f�(5�=*s2�o�a-'E�f�b=����"�>�W���.c�j�U�F�ңG/>�J�|7�F�ֲpȩ����eTu��5W<-�$�_�ĊҪ��f2]o|`����Bnw��a��E�y�F��d)�����ҧO��(�}�֖��b�Ux`Ѽ�M��D����atٟ0e`x6�����L���0��}�)�z�2�w��(�PY����$�cV"��f�n8f��Q��j�\��*�ձ;H��}T������ƾK�iO��Y����ʗ��To�E��ʻE�t�:��/��:���D��~��l��ͅT	��XtZ@�V�=z[ 镓��(�7\�����G����)P��~w�����G�Ǥ�EDS�xXl\_g��.hѽ���P:cH��<MҜ!�0jj�B.ê`��fl��}�˞�AA#հ�LF���rWYud,L�-� o���������U��&�/ ���=�[���'�*�n�2�;p���+����:�������O����������d�ycN*?_��hϼ�F��C��lq�·�ï>����<Z�s��$���u��C{s�G|���oRY��J�B�XT�M���!�j��l��jz���E�)�4M��^�
Q�[�T<	��2�ʌ�!�����I����*c�������X��ůA�=�<���O���KV��j�*wi�ׄ�	N�����ƪ4ǈz;.��%O9gY�\YFY�Lځ�7eZ%5�Ŵ��Cu�W|��u����p�q�>��]��"|�F���`#�g�z����;C�߬i���3%-�wp�v1ES.ℍ��Q-��ݻި���~�Úw�re !%����R>洧l��Oq/ 2�x	��ͮ9J�p��A�� ��e詘��.]_���"��%]V17㭜�_�����>b0�yW+���;��ӏ�R���0R�n?�KI��hi����>�k�����<��/�*#Ļ���a=0�s���}ZV��+�á�j��њ�)�z>=@����D�{G�d�S<�y�z�����������R��߁Y���m������NotW`̾����!�Q��7q������;�4ҟ�����?����Dp�矧CU�d7"����fWD�������|�� �Y%Zu��q�9���7�4Y�`J�ո��j%��"�l��%@�'�e ʃ�뷣MOāe� �����w���p8�" :��O��V���]�|,����1��\������h���Y\�^4(��/[��5�Q]r��>���u�"R�
���5���u�2�c^�Ũ��d� ��W�����|���^�b��;Y��m��Ϯf�L|�K��>�� ^5H��bv�#A�r�h4�R��N&��K�Xod�������b2g�`�����>|Jw^��\őК�V�&�.��j%���F����i�L>�D��n'��:�ӯO Fa��	�j    $��%hJ�"<�Q���-�!QQ�Q:AD�a����R�"Q�� a�1�P߁���: A��O�~p�*~n-ґ���ӥJ��-�����:	a�!�	Eb��U��Q�H?����H�=�8OJ���.Z���ۧ) �&8c��!`���+�:1��@l��-Ⱥ#����;��B��J̔!Ւ�u�^k5F�=�� ��)�,�dM����@<QwI�{KG��&�lJJ� ��_*}�����NTˢ���팢�����9Xz���j��y�|�#���Y%]��,l��d�GѨ{�@qI��DV���A�P�����o]��|P�J��g��I2�#���W�$�Bm�q��Z�~��� �We��ȋ�K�Pà��r[�N�Z��y��ts=$9�Y-��4��Vwp�oc%�/�S(kA]�0;�.�� T�.�R_��5�v�m;�ޑ��}D�[��o"w�������$����] IH[�qJ<n̦C:3���ߢ�ɜ#En��1w��ڙE�U̱�����sNN���G�G���Tz�F��}E�t�3a���*�H�%�q` �G�y�]����=�o�{��8w�[�(`�Q�,��8���S�2 �:�ԫ0��=+\��Ny�z~��G^1��ܺ<�� �.@��^�'�忣^�������r}�`���f(0���۷�s��ɯ[ld��8�2ټ��V�9A�"w6�]�|4��F����W."�׎ɒ�6(8~/	l|;�8T�2��	%咹L�Ro'	�SX
���á�M>\��w�d�._�7S����_eџ�*���X��K*���s����j.����.%/��ĸn�7��<��"�Z(V��ѧRg�P7o��O�k�兯��2R��t�d�ch}�Blm.�M�?�a������l��?��]2�K9��bX�/+ErϜH���Z��{_ǯA�׻���҂�!��_<�B6˴m��0?��2kFZF�K+{����7�lg_8�51� �����#�c�Ay�2E�4(�r��0� c�_�@�H̓��C*#7�����ǥ48Crg
�e�o�w�t4�*�ʛU�4ONG�t�C+�!���ִD�rўձ�u���kx��_��MD�J��r&�Z�f���wu�|X����1:h��������eY���b?� EyjNI�{�L��,�SAyV!˲d{!�V��j�/�NB�kq�J�3�l�v��z,P+R�b���������䁻ē�Zr�[D�5���	b<5"_F9=�8��f$�9���7�I�
N:��x&:�ޭ���ڣ��w|�C��C��Ǘ��� �-~?�w�%nK����O6���ʰ���l	����]��8��<�u8���}�=�p�3���}x�*l��X�&i�S
�NҠ5��H�K9 y��ހ+l�^Y�*z�S��;�G f��EY�?����o�K7�E�����- ��o�,l�|�# ��qƺ���[�&ˁ&��
m��#fj�*�U�x�R@������K@�-dq�[��𺨺���c#`�ƅ�C�¥�<�A�C��J�^r�Q�����q��|���d.&��u�<&��i��vh826K�@3��b|��� +H@:}d���}���������)q����Jgu���/��=�	؍F��4�CzhG0d赬��}��>"�]�������X�b�׫Q`�D;n�?RP4���2�m p��r�(��~.[��9@-��';��P�K�62�E
^1�� ,�bz�Tp��^��![w�����w���7�,�K~��Ev3R�@�C��PM��!�WEd�[nc�>ʶ�Y���'�)�C�7>�Z�]Z|9?U�������j�����@�B:��Aq��@\�h���"�X���00��=%�]�V�ݜ@�(�P0��@�?/rkq��y���+p(2zJ�L���������re��]4J	����Y.U�$�<:J�4;|b�#�M���,�����z�\�d<����o��p��[�Ff�h9C�"Mf���>,E�iH�&���5��N�V�,�"~�؏��d��o�h�N��!�`�B�ܦ=#=�kM]������	�)c9����X�H�b>C�+�z�,�/=:\��0�����@����3��I�u2$�����☉�-�%�)��`�	���[�00s�4p�c����3�N�! �~2�=�!�
	�5)&��*A�@�sq�4��8!)��c�g����6IM��M�����*��^*�m~/�O@�m��$4��ק�06l���!u��p�1���=�`��7}ˢm�A��L�,eRF��0o��C�}]'�nd�W�e�ږ\T}j�[����HK��t���DJDbA�C+���?r���d�BIm�����1�X~����¯��+��вK|#�=���wq��~���F�x�6o��#�SO����O~�}�N���Z��jd̰���������N>�[ȴf:xc�4PnDE�\�Ub���?�L�ri������M.X��jż8�]}�
�w[UL���Z����쌲l$]�.6�qF�����0�k1����&��f�Z �"�f�jى#O.e��UvQ
�{�[c|�6U��*��ad[�,�[����W���Shd��(�LO��ᐶ�G��_%��2�n�:�<(�U�m��>�����(�*Hx����S�]ΰ�o�=-	������6E�$7����U�+�3�x��ar�	��	 �� �i�e��r�N��������`1q�a�N�=��ݺʏԃ��h��3�n��H��3�������~�϶�y�#6X�O�#�"<z�]��􉦛8@�\�4	W�G>�f�Z_`�ګ	I�~�p�4��Y�ΰ��5L����ZCM����`���WUȜ��C���;��%���"$>�7��7Q#8��f �]m����=�� nJ��7�b�<��v���3��>�{�g��%�.0=�g`:>�akQz��DӫW�K�QXc���C?���*�޵��J sn�K%W�3��H�	�Q	���~��a�Q!�ɦ��o��c�I��U�� Պ�~~�ˀ
b�Dw7?0�A�7��ӓ����)�&rF���G�AܱGE1��/�w�@�M���PM_n>�(2C&zϲ�1/I=����΍���G 3�%)�G�"��6's�ͻ��w�u:K�K��;�Gӯ��6�l�F]�-�%2dN��7�m�`�iudɣGd���۾��%��iFDU�rg7�nf��`뜿��uC%���!tY���X1���uSP�Ӕ�*�Ybns�[M�ЖWg�w皊3��d��B���E4��.>� �n5t�Zp�������仭���z�	� b�A���0>А�����y�0�.�ɬ������z~��xW�����+E��#.!!۞�wW��˲�j$ ��7%�2&�G I��Jxn�	�ч�iz���&��&-���Sb��Y��i�S�����Vǥ��'Z�!V�2,$Y�\j6&;�d�g���S�~�]ֳ�UR �,�������D82�᫻�)��5�i-9�A��ց4{�&H\=�N�h���%23U��xZ�d�Y�^&e��#	�����%�[��	�)B���6"���^�*2��2 ��qc|E���UįKnI�ʉ<Jҁ-̺��u�!�X�26=g����*d(��B�>�4�/��1�oB(��/c������*іB�򗛚�j>��O�	�̤���+�ſ?bx��2�j-�^��Q�i+�<"�K��w�sTC��e��ݳ�� Z����2���GmΥ�.��m�x�lX>)yY`�z[2�]J	�ɩ����&�lW�ʋ>wA�e���� ����RQ��A}���q14�e��t;��y��0ɑ��1��j�����XL<��ӹe�C9TCm�&�Y�VV�Ƴ!��<tf��d3�݂נG�{ߝ���~ȈC�U̯,��+��==9H�޼�7���nLe]_s�NAH�b�B�#�Y����#0�M    ��M��MREx����T�K�W4J�K[Y��/���$��2�����OP~o-�8�J�W�|�=�i��N</3Q"[`H���ۀy�')�6�&u��lp�͆D�
�;>�����ɗ����δv�m��_D��bk���EЎK�MBqPH�J���0xz�SSR	��N=�^F�C"�l�~I@���D�M�AvA��	A��T5�BQm���G��差"M�CK7Gu�etQ�.Xf;G½
�9��Okp���� ����|nrbP8��i)�"h�y[�PE�����k�]�X3$PVZ�fh�W�Na.u�����)%��>�:�8@�����};~�\�փ7����]� �Л��${P�v;YN	��h?�M頜\�P�Lh|�NЯOC���,��K��I����U u��$�̉	K��/Z�ף�����9�Ǣ@R?���SfA��V��}���ɧ�n�����K��i�/��Gw3���JA�#�����L5���{�띫�Ö��G�6Εr};mt��������V��G?���y�+@�0��Ќ���Ȯg3OX��<�
9PY��k�k]�3��wy�t��U�=���L:�����JI	P�A��{�G��c�s��nm��;yދX,���)��c�㽹�����r}�$��zkҮ*F=W���A���h��� dd� �k�\�r4u.ڐ�f�r"l\����Nȴ��"�Bn�x�����~�\��сX�%(�oN���Z^�L)6Ԣ]��94���`CU W�:��^��*,>�w0��'۰��YI��}�S�L�+�M�e+S|7��'�!=k�Ż�b!���q��
��)�<��*���*��Գ9Z�~e�s�-]����=���{����9�離D	:G#�Bj'�)R��9�ӽz$����G�ϗ��e3DH�d���J��= #����XEI�C^̵��<����.��UƲȈ^���(�1�L:�:|��4���{�^�K�Ȃ+�pc��7W�nF__>Q������׏�n���6P@;����@l.'Ha�f_u�T��A�qK�f�Ջ�x����m�h�n�L����J�nI�E؍�d�t�Z����_�h�W֡�2��^�M:�l�Kz���yʄǔ���(>'�C[ L]2�>ƶr}-�����F�,7��)��H�X��פ�P*�K�Lv�-�vI�2Z▫�c�Ⱥ�!�pK�÷�[��(��I�= ��?���B������PM��9����b�X�6$�ӔY���o\G�X��m:���x �"� ߧ}3!��id�6x��-Q��`�̠M��77�8�/���E�X��W��)�O����+ndL60H$e��w�[�ack��_�#�?�yi�)$�&���0��[>.F���zl��̳ĳ�!�
���#+V;F��5�y/:�JF��H+���[�C k.(�\0e��2xT=�Eb<=�m�pL㵌��:L��6����ٜv��vrw�F�A�ub�JA]��Q&�Lp�>�2�+D+�sp��ɨ��i>��r"��{y~*���KDTn[��&_����G��c��ZHg|��쀑|ե���#ϔC?6�fۄ��w:��K��@��s]�l٪�ӌ?~s1	�.��.��
xr_�W�<x�[�'=��p��+��A��n�	 3%�t�H��b��%~~�,j��C���˭�f�L5��h��#�@�v�u�9+*[�Q5�N�h��O����p��/:DN��������X9���t´�;U{h�ٌ�0�\l2�"�p;���X��%]��k�X����'b��SM�^c���К&��N��R�B'܌Zx�S��s�� �~���l�{}$۰�p�1��pNo�O&ْX����y���)L��C�s��M!��&ğ�ڀpr|���Gʝ+�eqP).�ns�<�x�}�8���&�9���&��+�Sk�?ˮ�g�C�g%���$
�ը���8(�J��`�.;���.F��2� �Y�:4mxP\�vԳD�z��̦����^��Ⱦ;w_>3�&��Z?xX���W�F����w�G�qG�Eu��-���L����zwl��m�Y�-�Lɱ2�
B3z�w��"npo��3D�OEU,�ʁc�S���i;��.(����%8�g�A�+����\Oc�?�e�j�bf;_��W�'��ˌ`����5�w9E��Ϸ�Us�x�?��@Dh�Tl��X�1�<_MW"��ۍ�L��-�]�w;->xx���5�$y�&�ޒ̝?��&'�x��ҥ����H_G��E�;�3�"��2����Z�~�V�~H��:��+H	%�4טzVlĢ���*�H������93���8�Cӏ ��ZSW�cJ�ر~��^�vF7X5�Õ�'�{�KeZ#��Ícr�e�U���h�jE*:�qd��%D�6�.1�zD%j|�L~�q�c*�l�#��(M�.:p��U�;ӧ��i�����+���uY%�y���d&:m�U-1]�Ia�~&q�C�� �!��1��9&?ɍ��Au}Y�"�.!��q-��S�4葎 _^����e�mG�N0� �M��!��wH���E ����/x�$N�L8�������Y��\�qm�[�2���U��2r��$ύ�O�����_�%i~M����ª���lYw(s�[����n�4V]Y�`�Q5�bw�����W*�T��/��]s˯��_��s���Mm������7Dbv��xk���'ƎS��]�D�	>lcΟB_'�\䱇�\�����Iۋ���Mu߭ǹli�n88oį���u�W�oZ��z��ӯ�_�0p[�n1 x2}�j��j
��J�Q�D]�Uhj��Y�&�߽�� �,QR���1!����|(�{�@��?�{Z�ԋ��5��=x� '6�=/Zgzg��Z�'�t8wT�-��W3#߫O_��B���p�<9Jt���+�64�f���x���I�/a�V�_�k�+�9lV.ߞ}'�à���M�'��'3^��~Kog2��x�����Ići��W>= �ZE��c��]QQ�}��j�Ղ|��*��Ei�����B2DD3\D�W�]*HbcօEqc�F�=䄨�jK'�d�ӘDp��%x^ʸf��D#$�1B!=���\ow`�b�J
�e��v
�	���x�	�i~�[W}d��5>��;��9k)ݤKy���'�#�_�}d	}��(� ��bZn��WNt�!�t�j2��礓ҳC�c!�	���pՆF-et@;`e�f#]�)7iB_|rօTՏ�f�>�F9��3���6�+��7bi��`�#>��!�x "q�s��>�z� ��S��׆��W�P��W���S���t|"��.g+LA��reC���ӡ�v]��!������DP�~��Q�Z�7ك�"����1�۶�:��o�ƚ�(�Ʀ��{ *�6�+[�_O�%��l��=��*{����N��� W�6Y�~�U��5�1��6j*�eϓz�$�EXU��!y��ڴ5�'-1)���'�F�{N���k�e���
�H�?���R�F4g�]Qi
{�h�_��8����cece/P���x���@h�qu��	J�gD��f���6Z��Q��ke��O�a��F��%ڽ���$l��q�sQW��c˻��G9a�]wk߭�ȦT���Ƅ)"b5��V�$�\.�xT�Y]��9�9# ���1�h��zP]���ֵD�~���8����=�J����Z�Q:�9����;/)������N+K
~�m����-�Aꟴ�-��ȗ%���6�O��:�Ͳ0���p�k�a<�T�j�E��b���X!V+�o��W�Y���D)����٧�hY{o:��r�8&Z�@u�O�y�鞅V�*X��媗�US�zi��п��!�%��[�����V����	6�:��ȚL��e6�A��_�G�юs�˜��z3�����������yT�,�f    �ꑯ[����r�=Nt=pv�a��F˦]F��24M���ԣU �0���=��}����|�^��P㭅~��F�Ƞ��G��#w(�"����r�%{_�� �@�9�R�-3t��@tֹ�&��$���6;!�1 ���h�ںh��o��k^o4��f}��:-�׍�b6w���f�g�%ܨہ�d�#SѾ�~�;�S_����~�Im噮�z���92z��q��;)��G���C�sW	� f�D�Hp�w���W�}�
9�Oo�v$�0?�����;��\������l��!h�ᬈ5��\��u�z
��N��]4~��ņEs�+=�i�	rTJ)T�V���K�rTC����ym��gz�-,���~�^�n����k�d��T��Z�bj������u*d��Ȓ�H��H�4ڟ��p��C�����I`��AQ(�)��QpoQ�U�_w�3�1	�Gj�&	���N��f��j��ј��}!ҍ���s��!�����U���伋9��(��GHEt���]���v�@ �'��A�"������8
@����B��#	Ld�9��� ʳ�@�����%)�A(��ރ>(\|��D`�&P��\�&	�&pZ�i�A)�}
-)E�O�`� S5U�(��$��x�"I��1#�,m�2����٩Ew*m��4J���}O�5�r;�a�$�_�1�:��w�v�Ms��iR}�d8?w��j�T�6�Ny��s�6��*����Q	�Z\OB��;X\�S��v��8�AT%5����9�;��19�����e���S*��>�\w�J��6�b�ٗ�Ns��֔��jP�nĒ}��maG�iV�u*�R��.RY�������o���>A��u�"�:�?b�g��1F<qdG�V�A��sܡ�|����D�5&9ä�.�dy��p���O�|>9�� �\���נV���d�ՠ�#�7�P]>
�]U�`�U����,�%�(� H�C\
w��P����� IF�{�\��]�:
x ��Ka�Tg��6��P0vu��0e��	͖XZ
)��q\�y���2鄃h��1)�Z�|7{ȓ~-�QcV���/z�D���	@y\�Z�Y�*}@"����]�)_��^. [�MX�A�n]�gȇ��Jb��6�<� y!�=U��q��>ٯ�.�>����V�5ې�͒�P��Ir^�n���� 6�������� @Q��-h��b��8�K1jbp��K�v8HNv�-@�L*�t
����B�,臑ō���(��T�L�l��/%P
����1 ��_eۗv8��k�[SHd,>i���G���k$�:���`�K$d�D��/���kf�'���O���o)�SRg��S��.�mR��,��G""�7U�y{�+s��z$�g]����|:�Hn*M�����3��P��䅟�B���Z�~��������ڔH�O��:�9.�:�52�F���|+(�ba��E���σ��"�t�}5�@q.�a�6�fR�d=p:�;p��ƈ��.��@�s����W��9g��'�(�B���Qq����'ǎHe�}Q;~z��V���ew�G>,
�܍�x��B%�����&�i������A:�ö���I�|]�t� �c����_يv���I�aӈ��f�1|f���镾d;����f(���Tp�*9�9苷��� �#��>%
�'�%��.)�x �L׌�����c����Y4&�I1W���)��ҝ���R�*�I���!a��~&݋BK����2�">j�zH^rBg�����l�pG"�(�ڙ�3$9�<)o�Nߔ�=Ջ�� �"�#�ܕ�,�L���<G�))�$��[����=k�Q�@�Ú(�}�_��L T���9���iE)[�꣑� �Ǉn[�y�J#7����Ǵ.t��El��7HR�9Ql�h�>��SR�>яw��~8��y�� ��;�:�u�%���5���c���ҕ3�I��6S�������lل��l�Ym嘥si��n��Ì����X-�5��玭�FPI���գ:+�0�z�븀�X�CMI���;|O�Z�֕`���lqn��4H� L��I��x��8����GO%,_�=�Sс���ѿ8jȴ���q��>�2��GT8�{~M<)4�J�I�_��C�������i�x ���uz��I��;+��#rD޲���ɋs��r�@�me&#���f
vδ�9<xcA��2��Ǯ�I
'�v&��B�n�J�Z�'���c�w���=����6K�eu{f಴�~a�ѧ�#�;�8��,v�8BGߧDX!����%���.�ᬰ`Z5������.qgF������gr];���S(���X  �a�w\rlE�k�Y���(7��h�fA��X���G�y�A��L�<ѽe���:L9�I��)-����#��1a/m��Ev�F�f��>��YO*[��G�H���{1n�@z���%=B�Ϣ٥�Y�~r1�>$�iic~uX�^���w1 Q}<�Q���"t��|k�)�5�\"��3I���Ɩ��[��g�DE�w5�ϼ����^J|�K�;��Gv�qwD��Fj�r�q/	�3�sYWXEAg��T��A�\�'x2׎��/��h4�`�H�[�*�*�h �M�V��
-OZJ��7�GD!U��H�E��m�����ӯT���3	���1�f_[#k(�ޡL���/�:n�ŦzX�@0��Yqo�>J�y�&B���R��h����~2��T�E��'lײa3��'����"�ulT���?B��:#��%x����l�����ݶ�؃���m������w@��F�;s��#����̖�����җ�h���݇���4�cS�ZE=��7��L/*�c�d�ڽ_x�0�p�p� �t��R\v$� ���4k��Rb�(j�y^9ndj��+������>�6�!d�h�,46��n%fkm���팚��'�'�.G��jK/��3�ܷ�f\���NXQO�䎈zmLA:RvtA����ɺ���<M&�[q?�9*����+��!ː��J=%�� '@U���Fx�wS���vd��+CJ� #	c��r�4�6{;����3����d�OR{
��,w��~����M��(Rz��zkF���u���`[r��ػp7�i����Ȃ�	Ͻ��'mF�ڛ��'*�9K������G�LNx�e�a����y��#pe�_�ӹ�����'��!2 ��y_�굆�Q�'�/[��̌�&52���+B�A?`ff�ǫ,'��u匡�]����lv@j����G�,޿�=5ِHf�%�cQx}�$e�p��9j]Y=��}v�3�{�Z���xX'� �g�~c 1�����K�\��z��>Q#�k��Q·e�֨�B�vM��3N@z��Z���~�$	����Z��_if\Ͱr���F�����O��1��ՊN��u��݆��)�`��?��)�^�$��PH+wA�=1�v�{ó0�e�K�u{��q��X��vqwu��a!ʸ3M*��/U�N'O#�o��cn���Ld�U��"N�!W��EI��|hb��.I��aPJvjH�:�ᔤ�o�eX[�pG �1�ph�a�A�<n)�һ��(��P�D'c�����û��[�/��F	@��b$��gF��^,oh*;��[��]�~�!i9T�g��r�A<+�#��rG���fđ7�Y]�ng?��d��,�����1H��(�jP�Cǳ��5��n�Lt����M���tev �On��$�~�	x5a��}�2	�67���ו>��}�͌�H�E���#�>�!p}��@�]dJmAkgT�jϼ*�u��=�h�S-�)���c̨/.S#���{�"� 4>������o)��fF�Mg7��])�w�+ r�� ��U �ҧNG�t|O)�
N���g2�(MHx���Ftv��&�`�,�{����ֹ>���3
����خ_f-�&���$I���$�ڊ�tpaV�/�? ߼�    �Z+��Ӊ��+�#*�����j	�;�Y�_84�XA���R�B��_w���ؚZ<�ziM����46��\"���,�:����ˣ����e�,>��c�JR�-�X�
e�U�'w�;��f�C"v�;��} �M����r�C�/�����0�d��ު$ړ���������c����¿����R�C���7R�éf�U���o~��
��*D<��ʮ=�%��W�?9�I��e�	Q6�8C����Ta��4���2��bk���//��(����Xʰa�b뼏�-�3�ڠ C��(x|3��%&J��a#s~����t�bJ�_��\x��d�F0러�c�·'˴g|nmxH?.���޶�Lu�����Wѣ�h���A1�[��\OL���s���x�zt��2$�i���˩O�Q�E �7� �O�$���������/�P���:��y��"^2��ߣ��H�Ko(, ��ɴ���6�:A�=7���K;�C��_)���ZA�hʕibj��d弋Ae5�[����b-A	���Q�-]$�d�N�m�r��B{Z��+�s�6���"��ojӬ�RR^C�Rk��?�F�jas�M��g�.3+�U����ה8��8M.nB����c� I���?#3x����0dD�s�.�u����	�l�!�w�������P�ﶝ��.����[�ߑ9i�/gyJ˻�x�7G��ݸ��ω��D-�;�ϮW8���������+�H>�b�65����=�a�vFW߭[�O���h�0ȡK�;�o_QD+e���2�x��4��`�����4PY��'�_.�eS�6��CC����>9.L ?��Ƿ��F���^l��X����fX�y�:7?�����`phS��ȋ^�+h��)�0�c�*�z����Ob�LS�<jW3��5-�ѿ;'{�M���U���+>�rr����NE#�Hs�k��i;�>i�y5,*�Rh��a(�Gu�)�<�J�F�����9n,���$��1�U:'��� �q�&b�c���v�%{Ԓr�J+���R>+�=���pf��Y��^PD���*5,����ߗ�s�E�����e�-]�F�6|馑(�xh�c��0���T�y�����xIy�SOdv��=0�W
Qi�/oC���ώz�A�'N���NMI}i�ډ�Gk�����X����͌ʋ�M��]�peһ�N`ɕ�z���2�����׋~`Xbmt�uK��N4�;�|��Ն�ƦXUw�?jUo8ϛGڅ���,�ސ2�jL���\�3�?S�X���@ ���Ԣ#�ɢ�%,	��;���8� y���QFQ�B���j��'㦅�J�/D @];r���BM���`��^�����T��c�6ֶ��9�D����g?<��{���	KYy��?C���ٶ�o>�Z3���Jy���ҝ[O��.���ѡ8�^���FeO{ʈ�����H����r���V�J%Ï�o�'��cɐ���[V�������;n�a&��"�c��:�7��>v�`���9�\��o�yšƠ!�'z�^�!̵7�%|�Q%w�LR�`�ō�!�@�����*���@�����Z[� �r�@a:�9^���{�^ǃg�l�k -��wO]9�2^�H�O:�&In]����2���Q��Bkg��K�6�����|�ҪIӗ�Dŗ�:E8b�L���V�n����XJ�;qa�o�)q�Qq�ٵ��p��33}�RHu P~i1#q���U��#�~��+�*?�"S��C�L�)�z	�\��45�)}�(!Z�5�y+�Z_E��*���Qvy����(r�ϫ��u���@�0�U�|�܉ I8Z[�����:R���F[ID��2���6�sg\fs~��0s��*u��w�J3�U���AF G:3���r�~7�X�F� �cE�_����j,�S�1�^j>�V��F:Y4���!d����x�����N7��ⶼkA��*ʴ^ϙ�lY��w�5�xw��|��),������+R~1f��3��3��԰�8:˻�Q}��T���A�8ִ]�`�d�|�6�������#1ՐR��ܑ��m�ܔ�t���_6|�u���6�^w���kG�Ӊ�$j�'=m~I�iժ{j�,@,X4�ҋ-;}��I@��$�Ku����B}�L`�v�,@�����Є��BO�i����:����z%ӊP�p�m�]a��O���M���n�K�n��s�����(�<\닾�/3��݃��)9	�����ޔ�M��P�����uV[!��=��I6|i�P��ju�Pʄ@���`G�3��դ�ԧ�b���,��MU��N�a�տŉ- 7e�Ǖ��K��Q$��쉊�����.��Ũ�Xw����>UF��G��!����Bm�v�Ô�?��:E�X&�Gy�����{o�-�Ň��$K,C���M��3��_���G؊���3���\D���B�q\o�1X��D4a����7�=̾/䮾.��tYk��}�c<2���#���5A4/::ᇧ)�b�#X�D�xZ��t����fXpY[�I*��
έ�ۣ��5@ڬ��m�ؕ���Ӡ'�u����_q�겺8��b�U�ϩ�	f1	���b���lט�R<b]�� �WRj����A|/f/R�g�(��`���X�<��c��T#RE�O����+4�l�#��� JI�����~�A>)IM�H6�+�o&�0>SO���3��f&\������<إ�~j>O�d��*�@E�����\�\S�=������W���Ll��+��M<�N������,sȢZ#+��4�a$Ȭ��C1��C`\�^3�H�c��ī<ZP�i�A}�lh�:�+���B�+�{����J�\s���]WU�v�VW�^�0}w�B�i��y��G�3�����T߽�8��7�a~b�WM}�4w�[�Ah���L,� �v������i(k̼�e6�F����w��B�P�њ�C�͠/-�'M]� �=�8�`��
6���y���j@��]!t'c�<Q�+4[�/E,O�x'��������F����̎��#�k����'�y������jo����&V�S}ޣ���3l��`<oEɡ]8��%4�-��N�߾ʁ����9��l�A��Š�Y��򌕧k��h���H��Yh�xf1_<=�<_|���9@-���ȹ�U�@���Uv��nֹ�����d���2��IK���{���&�G�otBo�~O�����-�]b<�<u����b���/_m;��A��\��NEY�ي��X�I��B��?*��g�9�֔0���n'qل�*E�����it��Av�R����e��&S�|��у8�=O��D9�H���ѯ�w ����F�����`o����(��GhE��������[�V*n��/�y� �-�8���4v�1�Q�{��$�h�d��p�K�*�������Qs��K�ÜZj���v���#T~�ph(�ph6�I?yQ/��T�^�6�̿��
��VY�!١�m�3�8�R��O����I��RFɷ�rP��ѩ��=���}�!�4�]�:E<S���s��g*)��ׅ6�@����V�W�B�S��b��:ŷ��j\�$�~c�1rB�p\�h q���i�:�ˑ½
�khd��R������)��Z��c�2��G��0q�O�YڋC9��	ŗ}���� v��\�`��X�_����؋��q�0�v�:aYb��\��ya����)��w:� �t�K�aj��৷��u�_���dҐ!v��~Bz�; �:ރ�~�[*� hI�����}A*=��\u\V H�K6��l���姨Oe�� ml1J��7��K� �|�7�����Yv2���Us����h?ʴ��5���y�'�Jy3�M	����p�%��,A��g�ꚤ�Q�ƍ� ��u�6K���n�\�e����5ɝ�,���6h[�    �h�#�@��/����X.�ì�n�l�p$��!f��FyZص|e���wI_#M<XT���د�O�M�O��3�$��zG�]�T�a"��W]�v�F����hz9:��u��r޹v�p{�$����Y�Î�."����;�9B�1a�v����%������=��ײ��<vČ��tF��1�U�&`�A[�_m]o\����+A33� �Q��0�D
Cl���T<h���;pz}|���s&:(�v� ]u�U�RW}�6�<�6H�����������0�,_���wp�r�=P�} F�:��a���q��u$��� �{+/�l�� ����G�[T����rd��./Q��fԌ'T� g�^�]D���p�#��R,�a:T��7j��/�ї���@;I�R��~��j��SR��|Y�>�O�[_�+f\��t
3��؅��Ԓ���w��������z1yy�tl���	
V�;J�RD���4����cK�<��8�?DcK�*��	�տ�/�+��5�`|� �_�W�!7��@ÊC��Ӫ��g�;���KH?�L�pd�8S?��a>�=����4��Ɂ�-7H�� �x_%�+n�e,�%	��W\���k��{i�q�����)�(A2Ε������>�x�2�鋥�?����^���˴��
W�x���Fk�~��E���;vg�Ѷp�\ӈs'Z�U��V���JS�b���d��h1�e1�v�Do�כ���\H�A�w�'��*k[��G��{ī�6 ��ӻWq�p�c�2&���	nY{����5H�9��m�;Fa�	�eS�Ti�3�2i_![�S��s���f:�4��e~�0�B�����n����'����l��6B3�;�
x��Yu���{k3Y��ĭ||�̉"�|fd�Ա	V�?*/�A�����v%�6&��T<�n:/���Bͯ	�����;��~G��?�ˮk�;}a���7��E��c�!��2K��4^��s��S���B�w���eL�bY�-v|���T���^&�V�'R6�5�6:q�I�1+6.����]�.b�s����ĵ����O�U[@���v�/�~h�I��y���ث	��o0V��[�1$�3>k�F��*G�����7�C�l�vE|Ԅ������u�@x��G3��]PK��3$��o�k7v�aɵC�G��ʞ��m����=���?�G�y�ц��%.4%%+onA�;����mH����S.�i�2;*����X>ڸ^S���|$*wwj׌�<����W�� �Q��Q���6�S*�m@\�Ox��5��t����э��_Q�4���$�`s*�Qf�R���=_��w�F� ��nl�~ӕޤ�^��`�����k�K�����U!���Jfu�/�
HG?���^��ķ����кc9I[+���:��2{��{&���eIy�%���H��F�F�:CA6k���深���-�V���<�#'񭙵�ge���1�!"a��W\���a&ƒ!�EO��_��|��ߥu#��{���޿�ۢ��?ۻ�O�pj������bNW����~��ېu���N���J ��a9T����C;�3��O�Lz������)�ѳ6����A1�Ѧ�������m����jU�[�eT�����r@F� �������E����6�r~:Rp�_~�r^F��e~�胞u�L8�˙z!��#-#1L�+a���@���;
�/;֧#�瓈S������B�ZC��Z,D9;yg-��26XH���B�*��|��E�	 ��{�A�ڞDN��<]�8 ��䧃z�è�ŝ�n?�:��M����n�I+�48����g.�	`��(����]�~_.��ĉW!��N��9�=@ƵEQ�+m�5�:���C�kz��t����>�5��zSǴ#��bg�?��?�������j�@!��%i��DZ�K��4����wt�G��G9�G[���.�/�T+�u(Fc��@o��,炏&Vu�{�'����W�K�75�M�D>��qL�}�H'�T\諜A��e
��"~��@6Ԇ����m)>�>P����XuMs�b:![-(��.�|��\�h��fAJ^�Y�	l�S8^,��*�����L)'�|�^����t�/uW5��_�h�b�OiiZlcG����y�a3s9��C������Egz�PmZr���yr(�VA�ߒG��5��ݨ��o;O�<.��V%c�2���X��
��Ff4v��ܛ!߹��� �]|7wyLhP���j��d��j��F�a��L����g�D�2�P�����i�#���ٹ	A�xZ����Q�|�����r�k�aW��%��U����H�4�N���{5}�>}�� @�YU2�rx�*���|st*��ڳ���I��GVK*1r+�F�Fܾ�nn�C�;�`6�FVD��6j139.���j��R��T|�Y�}1@������g�!�x�yr���i��罷�� S���'�"�U݂�R���ߊ�%���A�dyw�}*t"`��Z�(�)� ���/g��ꙓ����B�|0�����=�E�����	�? �Wˤ����%���5u��\����1���!;�F�l���F�:�+z�����.L_�s/В��C��*�Geu:tH�([N72�~S��m�w��5��^�I:�D�K;d����x�ʿ���b[c�	��Q62�����M�PUV���:p�����G��
7�CF5K��[��K����G�x4E����fӟ�r�:;�ϧ�w�`�b���-�|*���Hf_\O+p}{h�;�fea�ac�B?V_,s��ex]j�[A�'�K��`��-�$�������|(4����qԅ���cj� ���,��+$_`o����f��H���� ���;���I�E��;�I6E�7�~�{JxKI��m����I�,��t পj�=:�V�,�!�Cz`���T�C�} Gt�掤\S��_qɷ��i$�F�rc��s8�6�r�7���d|�5�M�IΪ����T����/�g-��؜8�`��-�w�{+
?�֊'�um�䳢��O� ������m<�b���JQ�_E���̴��\B��:R����%kL{�7~���$���S�^4R��N��߰�{�WO�8�$GK�}Z��r�N3w�,��m���>��޲Ճ�е7� ���������"N�~��&�?�<�ʴHM#��
j�*�3l�x�Ew�g���w�J����I���ѓp�ͅ���W:	^��zn��GPd8�3���`=R=;[�Ā�(����Q%(��u�U���G��a�
4ܼ|��Vr�,��4���'O~�P!�9��[�j�E:� ��%k������D
��,�8%{;�b���g�mK��A���,\� ĕ���~g��;���F�I���`�>��	�	���zeӓ�*x-�I;HZ�+��R@}��b� j�Z��c�����$�e�1<mk���e>l�|��;�y��Z,y�_��~��J��7
�b6��~L����afA�Hk��r�?��S��f��kW^{1q�k��*��=B�K=� �ġ'"���H�ޓ1u=W��c_H2�~q{�⸓2#_FرZIn���b�n���/w�G��d~����њ{�SH��Xm�J�Y/���g��u*�Ȝ��#��227%Q��-���a����]29�Eǋ�(�ܓ+R�B�1+�����ޭw��f3����:�M���+f����kpW�ߔp���^$Q���&�}�O�M�x �-cf��`�T��4��9��� ���TD�Y�p�9�Ce����s7
��ws���-��7r�ɜ�pF
:\->�Ql\�T�	nj��5a-.A�=���E��F���z�U�-����t���h)��[	Q�4�4}D 3PPG�W�=�5�>GH��F��/��
`˝�}|3*�����h���������&5�kC4n�q�<��CjJ>��J;j{O���_H[P5w�?
�����@Q�]}��"    �/ߢ�r1��Rn~Ԋ�V��î�{��T��"ܪ��	�GU��xq��m"L$�|��E2�'Q���#���?�ks[�LK�	?露Е>k�ëhH��ݎ~�e+�u������{�F���/�z�1yF���PĮ���E���?.��00gp�'�츌�&{>��Ԕ[��C�ȼTtOz3]Ō6+r�lg1�+�A^�1��G�J���]'�N�\���Xqo�(��^����+���!�������b�r����AN#���w��㋨�N.4h V��-�K>B��7[.�n�)a�_�І�q���g��a���	Ȣ����_�N&�b��Z�g���� s������+�d�+/N�T�,#�/�)J)'D-�� Uೆ������	��&Xȏ#)�J�V�|�ZN��r8CBOy�t�6�o���7n�0����-jnGie�:{�e���=��5ƽ�}��Rn�O�
Ƣ>MY���ЏW�i����M��k���L�,ū�o=?��T��8��nT�����B(�2�.�x>�uV(T+�1G<0�N�K�b	ͅ�U���,��u�l�&�J����T��rY�yy64����w3�����<g�N����p�� h�"���3�O����%º̉�E`z�IR'��0Ώ�� y#�vP��͸|i��)%b&˭��C?�C��������觤ё1��};=xV��I��_HE�����̘�.#�BJ�V�Ba�hΊ�mU>iL����4b��z(���죐�"��3@���S�o�^�]�.�p�r���Vy�����摢 E�c�x{��2��B?ۢ����z��	��L3o1�D�������@�Kt>Y�	���Bھ����=92��m�t�zi3�F�)�b�%�R[+�O��O\��v^7��t?�U��fYφc,�ىCԅ���Ui!3e����@^)��y%�>W9�u�΅9!܀����{#R<�}h��h���ݚU5�S�-޸6
�9j�a�.�*��7y_��>ǽH�)��9^:szW���T >U�8p�/� z�aa&�}�d{�r+�>�����H�������Cfi0<�b�<�0)�6=O/������1KB���y:�9�;���}�7��p�붍tȇ�_~�1O��R�8�,o8�Z��O��C���{h� >�k�W3y�֨ߚ���>oI}�djmo����0�f8��Qqq�^s.�"��[6"a���3Uw�m��
gX;�o��8�j���������+r��L�2Xc��¶ɒ/JsvTݥ�ܖ,[���}��ktM�(�1�33
�5��&���&/����C:6�V*Sn#'�n����>a��ELÞ����x���@�L'j#Lw2��{e��ӞvCrtZ�F�_hj)A����*y��N�v���u�]��,�"�;]�`
(��o�q[�/B�!x�ۨ4.ƦG��;?���k%�X�]}��'��K�3M��)�7+�ejGq���� �T��<8ă�%fp�������3���:�$�,���V�s�
�"z����	�{'X}����f*��w�9)���r�?��KK�D8���k��I8r ����0dd���ʡ�B�T�7i3��F:-�)�N4*����l�l�d�)�,Ӕ0v2+�hT�#��V�gϣBc��Ȁ��x�-�?Y�h��wLT&AY�'�x�֊��>M6R�	�����q��aK�W"��ʗ�/��K��:Å���l���4�']l�B�Ӯ�)��\X�<AtSe,'^yNK�فɃ.��n�9�qI$.+���lL��q� ȧ�u��s����ǕÁ7Æ��tr+�"��u2��&ua\`�/��W+��{3K~�&�^㛸���}֪����*�u`6+�J�����5lm�n��53�orU��.��"������(|ˍ�޼k����� ù������Te��>��3�0�#5�A�B)��Ն��!�d��1d��������L�V��'���U�F]{.�\�~�
O���v
�L���bV�����Lc���я7��y���Y}�88�Ѵ] jFh��jM���Qt�7!����%����1�1A��>���G\|v6*-�Aʫ]�U"�'=l�s�[���AE%虬�"h�ik�Өo�<>6�߶R��,�ly<"XbM1<�wux{U�~�= ��;��3}q?�]l���>�<������`ŠO�t�Y�)�+�����[�)�l`p��n��
��I.@��C�>�8��Po��"A]��I�m��#,9=s2���MOI/wtm^��sal����94���
��ϸۼ0AV��Wʒw��<�^� H��5j,�w��S��Q��j�/>�".���K�� @tX/w����L6�ߒ���r򵵐���,�2�t@+W$@ڟ��"�;Զ0oLM6�8np����m��q���~'|,b)�B�/���ɵ��x�����gU�ܔ''ī�wг�g�p/y㯾�I���������*�t�!����|���V$|��q���E@ ��ܯ:� %��PǞ*��-˲X�w�`�������6Nc��ôdƆ2A�f�?��M����5-,�!�W� Xɱm����tN�y�*-�\� �Ľ6Ϟ�v����wY�$�[��c�,T�IPΙB��� 4��֘�n&G|s}�I��O��qӆ������z`�_t^-���O�	Xa8�}��&�O� ���,�M=G&rW���4�0��`ї�.��+��+�g��Ơ)�t�r�$5��H��B�_���� ����#�~�SP����B���87���	B�_llZ=��`Y�ti��DW���GM|i�F��<�[֡e�c���&�@��V��k�HW��W���O����z�fbE4~�=�*7%~AΔ~������%4�8�������d�Cf����cG��8چ@@vFoi��Q�#��Nk�\�k�|6�h�2�[��E;x�=���1�|}xE]	 }�B��΄��`�r��j"�$xL���ZK�:��F�ə�~J��C�e�A�Z�+Z���^� ��Zl`��߸��9B��I�W�p 2��G��ɔ2u�������?@��H��"����Թ�Gf��8<�ͬ�+����ǧ�z<ڶcїg"C������_�_�� ��K�w+�w9����d=շ���O��?�����/��N�H���q��� �G��8j��QQҾ�VtJ�y�Hc�skb!���*un��)��pJ������f�VE|�оp�3��)��}�r�Z�8gZ#P��Ut��V��tM���)Җ	�`����]o�{Ͽ�1���HmI�w���*k��0:
#��p��bB�}��ľ��������2��� ��ނuk~c�=�I��"����4H�>5Q����+���j��+��U�Md1EwUPd�e��J���k1=����F|�)�S�5k|��tnVrf���tr�|�_���6�mNKߐO�G��h��~ϋ�'"�Ő����V�=t�|���W�f-׬ѥ��c������vIB�"�my��QV�V�7����_=A*�Pڵ$����#���z�LI,��ۛ���^m=�i��6�:AR*˅�,IX4r��L��?PJ�t������dZ��(�1�$&�ιP�0��M�%#�h�(.lp�e�|ڀ7�#���j8��#-�����L�#�?���6te��P)�z�'pw�W�֧����Yi� ��_�"CA�ZAS����OBX��-�Vk���8��%7�M�g\���ð�2mz��W��~�Y�z����z����
3n�b�b�����]��ȷ��`V�/��H@� ��mfC2]��������^6����!R�5�*��\��cXUkp_���&��Y+~"LX{�r&���Ϣkw��g�q�Л�f0k^��ى�
w�.��+�Y{ڷ��m��5lڐN��-���Ү�ͮZ�ߕ(o	��*�(�    [	� ���G��7�Q���M���fJL�	<C_�^�;�x����u�y���RV�Q�4'����d0a��ɇ�ڧ(�z�͎�_L�e����UPG�����;˄�a{+>�a�HPm(��;�����s�".�Ď���a;�="�>�ap6�+ ���b�֎.#�e����
OYx}��R�7�9�:(�4��l?,i���ҫ���0s�sJ㓶e�:��s�h����I�S�O���|��k�.v���j�џӓkY$0�ym���E�b���N?���ئ+] �z1���M�Q����<4b-@ E�/L	�'#��������t��y� �]U�>��q9�i
xd�2���c#�M�rD��n������� $�����׹:��lΏ���iU�����0H��FW�����h�� <%)�}蕗��*�zVr_����x����z��({>��J���W�|�mDZ�*2>/��._��#(�ާ�ϗ�ӈ��{)2<m
��߯c)2W������o��\f�h�W�zr��4�Z#[���h�6J{Y�|r���E{�X?���{�y��' ����&�f1��eX����	���|�M�稡�NF�r=����wW�-��\�Ѻ�t���w�ol."��_s[�5��x@��ήʳ{�QE)'����ޟq?£%q��*���"-��D��$Q�"��@�P��t�?�'�V>#F4f��
%YeqrJ^_�d%7��zh}/'?��SﳄY]��.m��?`�]g�5��8�j@����-�o����X��c,Tz�^�L���~���
���`������=TTJo}f�T0�
��9�ǅ�ۂV�4&��$��?'���S���6}��I���>�GeV��¢2�&��m 7%�*��%��{����|����X�3^�lv��Ɂ��x+JUm!t��d�;�`���1�5T��G����[� �"��%-F�'�]sY���sX�@�6R��?Z��o'd�>`M�� �n8t����e?�y�����x�K.�+��m�s�	Is�l6�Y��L�pSI�.-��kr��T)؎���p����H�jz�
l�[G���|�ڂ@��+�̃����10Qq�<i��b������,�h4��aԈ��} (u�ށ�E�A���Mw�׵�S�BzX��J:}�ç���aЪ"H�� q*��/�.�|F-���>�R�*��B�_�>�}��n�}�~r/3Q�_I�n͊P ����K�o#�)q��-�����͚����W�qT�{�]��� #J�o�g?n@F@y�9�j͕�E(��LXV�ړ^�3*���Lϟ2�9�m�/ý���4O;>���{���O�ܶ��
�
9˿���b-��Q[��?V_OA���)�aed�xm�_rz��i���5e����t�>"���#� �������L����G�d`꽐-W�q��H}�Tej���?`��Uǜ���~�G;n��-���U�7�0Å�N���`�a�6�� m{�nT���V6�x43��j�@�#��ω�$��dx�[�����}k)B�!г��̬z�C�(s����G��']�U��%}�3Y{iọ�}�[*L�J˕�0���9����PZ
�jӅ�����w�m} ��^� ��X�����O�5������F�ܹ|YuB[���+=��oTF��M#�H5_O&r���(��X��߂*��`���* W��Z�R#S���H��Qf}�̊o�vJN�S��%B*J���_���>@����:_�a(fߥ�Q���SD����*��2�G$�]�l2��!5<jkŉ�h�����0מy���U/.��%~��81.�2��x��V ��,)h�X���{F��l��{vA��nk� �W�X,�u�ѩv�^��f�nj� �7b�^�ײ�ά;��g��������>{��K	t͗��ʹ{��ywϣ��i�6�\nrz'���>�6�ٽ�����%�9�?(�������2���׼�Y~d.�ͥVY�3��L�m��C��E�ej�U���>)®`�R���C4U�9�j3u�;H6�jh4T�%Iג"�g���5˥͍ZD�[�s����~���ނ#%h<U�_�H^����u�J���â��r����c�Zd�#C��o�IN@��k�MTq0����g�����t
q�qt���W]��EH��1?1G$�/�O�>O�V���j	���RS<���5 x�M�?H�k~�t��""��;������W���Oo�|
����[EZRe��5����fC�p3�䠶����e�4Ř�U����%>P�@��з��6&���4I!��N���Wb�[Iu}����o_��t���84�6�	�w��<�s��P_�T'?-)n|^���ֈ�rxjl�+^���K��6�?��NEmu#QV9�֏~�cI���E�&��k��KAop�t�\���!C=�ZȇeO �$4���΁��m�ι}3)���gm!ֹ������k"���~ۯW�$�����c@3�U�/G���a.��Vsɶ(��W��<�a��&��~/_��������"�c���0-�0}�3���鏞x}&݈17�6��oa��j���Ci>����x�W���S׬g�b:�@�Eqn���*}��LM��������=5撡ى���l!�L6� �1	��~��eS^kC�k�����<��Fӧ�z�G�ȸ�#���j�N�<�$����rZ�Q�Ͼ`1��y��}��a�OK	ۆ.��,A�)ʪ��f(���p���GcB���b/���*�)���e=���{~t�$���{J�N�*!(t�\Q�$:9��w��A���y0�XhD��o>��m̧"/�^y��+���nn��
�P~�;Bia� �^��ߖ��!���Qb���G����e
�k�U���$g���C��b`
g��0g^F�&M�$.�0iH�Հa�X�������ފ��r�ǫ��a�2΃eÛ%>?}H�\k]&�.wE��7�,qsGc4	��w�K�w�r8�R�ø.��s9c�K�TV�>X�]K2�}�2��Hy���jylNb��]��{�c˜�S�' {��1�CZ���.D�A�D\�q-�f���cƟn���D'P�}��q�Pq�牉N�q&�r�9h��ԣ�X����d��-����^D�G�V3�Nұ�.�̚�fc��Z��!"�g�� n۝�rta����ﶠz��SjxZ���a����O�̴�μ	�4�J�����3R��N��̍��:u�Pp]�� ^���������+����^RC��\��Ǟ<�N�[����|� ��i^p�8#�w%�'\�&�W>�N�M�� �<xH����W�T������/��\�C���X��=�@��Y�\�J���*GW�e5�)}vl�~c$6�F�9�,�KeQ{yT�p����w��F�FY�%����ިÞgNջHA�_�!k�>�3U�,�0F���?U���I�=���x1��Os�ˡ��*!H����W��b�l�"R�A��5 ��ϵ�
�5�OZ6U&,�&���;�]!q|������q���1-;k�z&�cV^�L��C�]U1��a�[�Lfs����yM�j��m&��q%�\tK'�mq���("��������lʺ=g��&%�}j�MӉ>����5SH6<Ko2��;�f��O���]Ͽ���-iR~�Nu�U�{G��c�y�!(sR��Fib����>� �
��n���K5���N&&�[ܕ���m+%V���/���h_hw�W�V9�8Z)Q���Z����0�6p��uMPUST{���@I����۩$4cx-ٞ7��qB�|�1[�|���Vz	��]�t��/,q�S�����{�����~�3��+�� �o�,6ܭ�t_�\���(H��b�Tx�^݉V�d����)����@��%u��~��k4v�y�DQ��/C�E+v��3/���,m"@� 1�
Oz&���ȵ�iH/ۅ�y�    ��`������Ԁ!@>���`&���i|�|A����H��]�$7�u�ݔ�� y���DE��S���C�7$�H�a�r����~�b�Y�Ͷr�]�_�F��ʅ�k	���Q�p/H[�8\�|]� �jI�� ܭ�r�,b[�S����o�?}�!���qদ�U�ac����NAY<�Վw�~_*1Z��*�A���?s���s%�g#�{�(�4��I�6���:3绯�������Rl4*���!�7��G�ܿE�]���Q�6�qY*����$�P[�my���\UU�ʹ�U�ŗ��&fd�=�ӼT�> �@�ƱZ�r��C]��K�Dߴ�і���[&ʂ孖x���8_ p���鬘]��fm�+_���;���+1�:�=� E��ƲO�7�dH_U��]�O��K�����.��؜���wI�ٮP�%�cm��N�8�*�k:7_���B��`p�8���~��{ wriz���P�Ў0�%���}�����O�D�MZ���;5)0���d@��4�4��V�	���W��σJ���oU0�' T[(���6Q�^�s;Vd@-�r��*�����RÑ�.<��5@Iܘ+�u��1�c�:čӸ�<,w���u�?d�}��9]�ޓ ;�����]9-���D�R���r8M�/g��i׾���>����j��L+۴-=��;J�s7M(�R=��i��˞_�[;s>�7�b
xk�fN��$���U��@��x��$���;lɷNO���9��p�lv1�O�P��!�z�;h��`���A��)���0t@�3�}v�U��W��i����Xf�v�yń��3���Gjܼ�I�	����B�EQ��E�ߓGۥ���K��#y�S޵Ŗ %�:��9L�;ݮ�	t�CkĹ�������c<�tĦ[�e��\�C�Wq�;)��K��Q?\@璺�hT��x� +8�"���zA�s&�6��aC��3}8<�]<���?R�+�Ǎ��ڵ��<YC�;� ?�Re�Pu~d�8����6�JMS�v��i7�-)^;\��.=Lj�3�d��}bv��;�M0����e-9�����+�)I��b˧����ߪ+Ƒ
��3"�
<o6Oω����+�Ha!T��OD��2<����E'�:&�CO1T�N�(XA���"X}��@��ɾt6�r�9N F*K��1�j_sz&�e5�`�(#]����)��W_����s��ibki��0b��*��*O�ͻ��TLXwjT0�Ȩd|�7�L	5�ph��g����i1��η�v�|���E!�� 7�=�b��i~z!p��@]+����}|o���r�0�<��~�6�ݦ�����}Y��T�յ�F�=�^q�/���a�5��͒��7�7�ȌtY j�N�,ms��l��I9w0,�A.��٫�ᛗhx�ʁ�b�֕~[j��T��h��]3};s���rJ�0��}g/E�l_<G����p��c�V��cS��7�����I��o�w�:�лV�xN�)�>V�	�q�
�A���`�ޏ*ydh?����iͷ<�d�d�����S��J�B��8@�s�A'1#|~�x1x�['�K0�*�F�����<�k�.9n���Y+�A��X����iRk���Y��W0��l�ե5vViםʣ+�lv���y�L����N'v(ox����	��C��3���25���8�nhE����Hs�av���` �xd�?�RH/��!����i褠�{��g�x�r�(uܢ���OO��Qؼ��J����N�C��gXx����g,�O2\w{~ޡ�Z� <��=�~Z}�y�m�L���=~�Y�bk`uf�I3�}����)x�i��n��P�N"{��ƏK'���W��C��k$F�.3F��g��pԥH΢�h����ὁ����(��:��|��$88-��2��%��|��Ȓ� ko����c��r7 ��'���۱q��|�2�e��b��O����<0��1zǄ`�/�vQ�D٬_�]��6��!�f��Ek�]x�g����)�	2�2�7� ����2{��Y�J�նA����U����ᷯ�1�D]LȲor�
ʝ� ��F��ÒivúJ`m��'+cf���+����Y�����f�{����2~gYu�ş��H�~^��GiL�x|I4�1��/���Oi�@�O�"qT�e�&ZG�
��M�^��m�������_#k���G&��<w4A�)��p�@t	���>�c��z^0rcm�����,rدg�R�k��i2�E9�|���?�Ԕ�pL�o��J4��Q��l�T���.tW(f������C�@��>�nqr�2%��q��M�dMp�[�.MsH��X6����n3`0����"`~�ϋ�-><H�6���ht�f�RVڴ"���,��PMW�N@��\:X��$;Է�1�G����a���Gr?V�J�M�����L���(SA�~�dԦ*��U����}��A���D��eK[d0��(�'�8��sO�vw��~�)qx������r����`L)i��G�M`���ʍNJ�zG������U���w$�˷��HX\��>��.�?��B5��(�U��}�S��������A�����o]�=�xq����@�bd��vmC6��@����w�<�ơ�kHnn�6EC�s����<�����˯�0#��+��~�6u!l�#�8r���/*2��Km�9e��<��a�y�|���*�
3z��+��Vn.U�	Eݭ���B�"� ��x�3Qpu�Z����y�+GK`�ոAc#��Y���ăُ`[�2=%�(���p� ���N٘�=����*q)��uQD���g�L6�)��V�A$%��I�"���AXV_��<�����y!V�r�����v�{ƨ�g*��6��F��n��1�~��Ȇ2&/^��TH~#;�*�f�h0�W���_.=�C���{��S��D�)�wH��1C���D����R�n@�֧׏=�-#�?���(��o�[�^��=s�h��W�ӄm�[�6�I�[�
�{���v��hX�
f�?��b�߸'R͝yF᎕Eף$���K�ß��؅dQvkV�Z�1x͸2f���.�2�*�;O��&�%0�rN??���B%��DC{,$gN���/�>e�Gc<�]iw�y�:�YA����*w�]��5�\5X4���W���&���Q���bP���� ��2�h�X���|��%oe/&�s����
���V�w�?*��B�E����B�3�xN=���k�.�p�j�jJܭ�K�/��SyHT��s8��b��`c��>: 1ebdw���P�}f;�,0��U�>E��$O��x+�9m��tƤ�$<�_�B'O�0�-��l�\����ǳ5�U��i���]T�S]�����λ'8����`!���E��"���Z��;�hu_�M�Q1A�8	�R"�<�Y5���eSWW�Q��4�X�1�"��s���7*��7r	���A�:�D��]�������Դ����2���L��rCn�*�<�S�+�u��Z���/�ќ��T4j�>��-p*.�@�&��� >R�5h���տ��jM|~���캬	S�c0��e@���w�O|���������LE���t6���֠ ��ӜىG�RpT�3������L��ߜ"���x\�b���#_>�h���*�Y��{��8]ބ��`��'�L�Ҏ�bfW��a��[�r���ش�uSJ�뽤f'�c�
Z�������F�T�ͶAO�[3����\c
���]�˔U�e��@[mM��q��Dv��h�DZ�j�ҫ�s�O��7�Q6��}{ñ�g!/{mD��u�@MT3Z?~J�`C������3p�?ek��/���)��Q�N�?�Q���υ�o,}��V�Zl���,��/��a�7�n�+2��7�u��1���;�L�� �.�#L$�)ewyܦz��Y[2� �  %TM �z���2�<�W�O����0O�&�h��aԍ]lxo�w�}�]�\s	�7��O@�
%8�'Y�&u����W�n��N�_:�A$��"D��Q�s��%݂���6ɦ]�f�,�B�gJJ�Cȱ譩:�����JM�07���Zd�?�1�'�����U� ����<��tҳ�zPR � �{�Yx"3p ����je	Hs�:�{a�ѳ���w�	Ģ�\�K-�mU�a.ND�wI��#��~m�7P�"���mn�})7ٱ���/3���Yv�&�^<C���g��2�s���zU�Ȝ`P��rgg��59�U�;�y���ر#�&��� 	��&�5+.�ς��G *>���/�-�9@�=A�����_>$-�7�ZT��I�t)G�$�O{�l���a�t6��͎��IW�9l�"�s��0��U�h�-خ��=
�CJO�$g(�������) �緪�Y�߽ԡ���Y�"4���O#k|Y�>�q-ң�ne�=>0�K J��U�Lm��l�w���m�ow.9������}�m�|a��<�.�bA���B�S���"�4�����'��[���3�^��_�b�x�Aǡ�2��8��!��O�!����6̙��?y���}C��ԙ����"C�ۨq��� ou�J7U?��T��קHW�i�{f̣ا"��D�Xm�_��n�e�;�\@<��^N�bU�̅GN�ì;Ii�����c(�M��?�h���⠺[�t"��1ަ��������ndF�����]^md�iv�7_���ע�O�W�D�B�"���P��83�*�UP ]I�d��M��#|��Re]횑�;�򀶢^��O��i�FD*��(/�3�Hp�j��n��`��LɃL{-���6Ǧ$Q��t=e����}�/:�����+{�,�=��W�8���C�:���A��:���R-=���J���6���:�C�@��=t�������5F#K�#Az#m�hc+�R7�>+S�~_T&��/�B�OYF���Z��6�bg���$����$>R;��6C4WCu��TV��~u����C���ho��;�`�oj���NRh�R͸�ܒK��5�����>[��?0��/����J���0���~�����?�����v�      (      x��}َ�Ȗ��WD.�l\��E�6�떕�N�r�\�킁F�ILQ$���ʧ���y����/�O��9'"�(e����4p�vI"ˉ�o�� >��yG;��(^���u�e�#��)���������d����q�/�4����4c�"{ǹ��	�M�f�l�c�G�}�__���A�|z��c&��8l�g�C7oxX�-y k����s��(g���ȃG���Y(|H;�o�a�DƲ�[2��C���6��6��<���g˝����O����DD��zaE��������l�w �����"��a(������H� ǅq/��L��`wK�<<H�"ܗ�,�!�W�N�x����0u��"/.RX�/+f� ǅ)�I°t�W��,o��^� d����`�S�K�����|z��Gl��I6::�n�F	X�.��<�ž8���(��a�u��{����E(/^�$ّ$����4����;��<b��ٶss﬏���p�+7�v�_?������;.f�.�6���0o6�O��w����<L�,�'Wt
�Ζ�m�/�p�)�D��ӕ���F�-FǴ;րY����p��������ȴ��%� 6jm�^׵���̓PdG���v�'�������&^I�(ǳ-f�#��c�����sZ����OVk�y"#9"$ a��z� PG�a7[�E���nDF?#"�4�u��wVdAc6n�@Ul^D>��/Ȉ �����(��d�np����T$H~E�#܊��$��R����9LI4�3�FK����-�J� ���∇��ρfaz9�l<�����S@q��i��=�;��k6�I��� �T�"�l� 7�ݑ3t��x��E(ry�V�v�.�ܑc��0��|kW�p�4���>�e��:�����*]G��,ͼU���qɢ��<Ws�\�o���?�:�֏��}�����;4l���vm�=��E1O���%��=���;X�u}2y��R 4n�5�#�aK�౷����*���8 "X'q�s`� 1�}	�3\J<'�o�;6=�
��Kᢏ� �J�d�8<��+��[Ɓ</N�4 	�"qB�	�v,�@> ��?迫�Oѥ T��E��T��ٸ�P'�N�}�7+�7l�ފ!�56�$��Q�υ�)Pj7'O�d��BJ	�Ä��D������c��n\xE�;��ѥ�� �N�,-xJ��P~%m觿��G���!��iZl$�y�3�H�`$���|nn�_ܦ��1�0C*�в��Ï�<�vrq��uA�HAI��́�|��I)x�Ъ�`�TC}f�o���������D�C���C�#Ԉ�F1mX��!n�W}= �/� �7l����x}X�i�H2|��5�����pq#؟��/ �c�A���b־�Gzw|}#���=�?�
Mx;�٭e�����~n�R�m���R�e ��90I9<�7q�-��`PIAȘJS)U,���`c �yꃌ$�$��c����@�f����A�
�	�U�q :.qQV�(^?E)�?���MO&��mV�fW�L�s�/�u:����[����t@�
Qν<�5�O�����+�E+���T��� Z	�Kd"�;3��#�tz�nox��u	 2X�<�1`������)?E��]�wXD05�����#��5;�Al�30PZ`6���Z�Ef�吚�25(��×�.D�i��c))����\<<==ƽ��0
Vy�@F_׷Lm ���렾���o}ӷ�	�o�������o}ӷ��[���ߧou��ַ�K�-�ކn��6�����K���o����N�4˙�����x*��B$����g�[�|ctc��X��ȼ ���2 .�sR|h��u~�p���9A�CT���Bԉ$u5�9�^�EC��,�06���dx׆k��.�Dj+8��xz�8@Nr,�Pa��
�`!"OjAHrI?@H�����,-�MmD'D����T��ջ�o��D�zG��b���_U ���5���j<}Ͳ.I[�U�b%��`+IY���b`�41=�)���4�hrG�2R'��B�Q�^h��龨,/��vX��x�ϟ;ۻy����X�Ԧ��^�XAa=`��L������ |0|�k� i�</�xU-��O<�3�!kԵF��p����7�}2~J���n�?P�(��!����XE�v'�i���2[�w㛻�kv6����~d�׷?O��On������	< ���x]���Cࢬ'�B�%�U��gښr^�Û��ӯ��l��?~�N$���"a��'�lh �ǧPǧ��gk���JQ�2��<Dj�+�?�%Z`bG��xS���	Ok+�i5�m�"BQ�2yj��<X~�p�h�O偁�:�Wԅ���O�X�cK���G�����}ǩc�M�c�G�m�}�%v�L�߳\��bU�����ځ��0[E�n;����
;�V����#^�P,%��/��?�/Xb�;�:#�g8�}܀+ݑm�n�n���
7f��z��]=a|���u9��ܰZ�z�n�o���
90���34f� r�d1�B�n߲�X����Q�s���+��.4rtr8������䌝�L��٫�����$��1�\����^݌�N^����&0O���?ȼ"� �3X���A-�₇p`t��G�"�@'ɕk�C\�>I�0X�g�44�Y����DE�Մ��k�>J;1�8z���ξx��u޽���}r8���l�Ү���
z�0��<�n�6�����h�n7�r�����<��tP�����I "�K{ڮoO;S8�ɒ��C�S��R�m����	U��U�����KdG]�`MSlc��:�@�d&"-�r1 1�*=��k������ޡH:�9�t�<W.U�'��_�~��ޝ�ͷ1����F���� �*��p���~ʄ�F�Em��S`x���\t+�@4G�\Q���V̌��k�Ȏ����u�}�;�����jG�r���V��I>zU��Us^��2ڬ�e?�cnw�ns�yIg� �[�A�ł~i!���"G��Dz��l�<Z�w�09`R���`ݧ����1�l�B�m���AX�Uz��"��"麘��I� �����p[�Ƿӛ)C��C<G\ ����0e�v�H��5N%��1�%YF��Ɂ8%*��g�� '��O�D<�D�`��,�xO��U��ӓ�dj�b�@�����#����z�a�HK��hD���uG�O�RJ
��I0`;�e%Wd��LH�D��;�Qu�$(;ҷ忍W^a���8Z���`a�|��_���L����� ��5r�gu��.�&&nٽ�K���ݾ���1x���|�s/���0��Mi/����z����կ���������Wi_/c�P �8Xap$��UO�Q�
�(ᑠ�Oy��̮�A֨[�1�t����s"�J�h�B!鷈�m�ZU�p�ôSb4��^��4��R7ɪӭ�YQ1eb��(�VY���}�K�3�P���8�	����-�I��<1X��;��dc2��o%�{���Ē����:t���ި���XY��}����n�xw�9����N���]C�����φCg��lg�a8���(}��v�l��u�xf�-L�ݕ�]���g�|t[�Syq���K���ڭ�4�ED=��q)��ޒQU��sZ]C��G�7�%�eY��}$�p�j����i �R����m�td�ʑ�V��;��B��n��8!��]����:���{? #�F�F��� ^��=ǰғ̂f����/r:�|�4� ��^�i���Q���b���$��M���E+3�)hG��Fo9ħ�J݅�;�.N:�#�q�r��TxǗ���]��&�c\�ν|%"�w)�`�ح16N��	�赜g�:D���    *�Q�*w�����z�r\���u�;%���)�).E�t1�$��A�����<�z��v�a�b��O��X#��2&�NEgZ��rb1u�D3�-�9r;�h �9��"�oDI�I$��0�2Y�9�MC�����&1�'�Bfrqt�Y���i:��Y���������j~~�?|��[����;�#���"K~u8:���(�B��rҵzu��.�a�R�T�FI����C`f�V˂x`��R<<=�{��wÚZ��d����&��svzu�����SP3�W���ْ�U���������zw3� r�&��;C܀b��K]k�N�@
~��������ν���Z<'>Xa��!l����M�q_���lS*xW�kR��ⱖ�,�BF�����;~,8: �$І@w@�;��8u��s�uH 䚶���q��[�[�Y���Y�A [�ggwg	V�9�� ��{����\��Jh%!DG�@���q����b��+Rzy�R�jU �ǘ��\;"N��PW�+���-�3�'�
����8)����x
��E�����c�鎒e0�W�[e�(�m��X�!uW�g��q �a�eK�q8/0�E���x�:i�!-��rRQ��B|=��'�X�<���lO���V�n�� Ŏ ۜ�d���wQ�F�G1gZ��H�� �2X{A!N�&���*������r4X��K
�?�Xy g�ds��^��?(�Ve��r?�M�+�8(���60��6G�Y�4ح��\NwbPѭ噴���d�m����/6��>_���r���g��y��Z�e� #�k�nw_����p�WDE�j�ކ[ To�dڏ<h蜰����pA�nk uN��d5� �f�G��O������Έ�L��e&�_i#�!�|����D�TIq^cP -!�7��`�E�ɇ���.Ȳ�S9|\������H+r��t�O`�rK>N��>K����淴�fi\,�9^�Kq.P�Ӳ������m�`�q��l���S>��ZE�`9�N�Al��!K��Z8�򞦊G���k���]�_qG\Q8�XQ��R�	�j���Rc)��IV�m�����L�	���k�@�#f2�2CB���g��D!]zh����vz��$H�9EHɝ�RGB2�|����Z�h3 �}�I�σ�xb'Y&K�2�!#O�(D_ `��#L�����1خ{�;����X��
_���T��9�0י�Waw�Y��$䖄Bq�W��1�6�D�Q�\աo�+I~#�}!�ʬJ�l��}r�#��g�_���D�)�0>�*������Y��{�n���
L�a�կ󜳓�KwdV�ď��Bt)}U�)��!Ϧ��h�ʉ 2�#�M�]��{�����:�K.��p���?��!�~Wج2����1�F2�:R*d�i���RԱ��5�Qzt�ZW ��G�p�C�p����u,�6>�b�L	�;4$�?"����z� S�5{�|���� �b���Hc��E��ї���D�e�6F�����N�	���@���Zް�"U���F|�ZN���6蟟%�v��ڟ%���M�_$7� �2��<�?B_�x/UV7,�B���"��)�R!b�Zo�4b�c�}��/���k_[��l��Oy�K����c�A͎��n�QO��_T����ﮮ��փ���W���G����A3�Uc#�2n/N����������ű�N៿���X�p�l��m�}	��H�_�.�ݏW�7�AiЏ�uTQT���~�0�"̋�p
P% E��� �(��y<��%���W��.��9���ۃ�h0xmY���"���cXқ?�Z J2u���`���G���A�N�f��%I��~M���gF��5��Ӻ��_���e�?j��a	��Pj��F�p�D�����3�h�)�R��JQi��C���L�r�(�"8�Sh��g�PF��َ1��ÀK����o8=K�TEQ}�1{e e�6�&\8o��vn>K���d��C趮�YH�Edn,m)�tq��9h�U��՛U�� H�I���ӌ{��l�PI�����G��a.LO�����e5W�ʄ@.���M:�o�%@MDHƽ]x�T���!�K�v�P��zX\��ե6󉁚/"ܐK��(�{�)�����t���`�7�K�Z��Qѭ�L�T��VI��ע{���qI�5M��=W �n��!ϊ�>��j�&�G���ȫ�	�G���׬H7(�e��gu�����n��vwDI���J�xPOդգ�C����:�j=�g��&{�VN�~X��c�_�=nk���9�]4�:E�_�Y����ӷ��@�,ĺ=�I��iH����2|�;���"w�/�<�R�|��dh:+f:�KG���t�G�������ò�OY%��R��"�nU3�`!Fqh ��Njc�gYdp]��"N�d���ƾ��5�	=9����"�iNg���z��2Ld�i��j2��p�����X����_��ɣ��2�v����)N���a=����D7ͨ=4y o��f�R�{���2�Q�=�}�r�#5U���M����ț�\4�h��[��nr�����:�셖9ޔ���r�Mа)ʔ�4$2h��ϋ��4j��Y��gI�JmG���焰2�a+�w����fh��d��D�h�d^,*��!��X�Dϛ��h��d��(�bU��r;���_�P4�Ϋ��Z`�є\B�LV!<M��A�Fc	v#���� {:*�;��ε�3���" �QO�*Iq��m�|g����dr�:{�zv����f���/���=ݎ����emv����c�K�&�3yQ �ʴ(	�?�}�R�}�n�c�s�H^rQ�Ԇ/@:�~��	pO�>x�r1�.W�9��Mz�l�ԁ_ɒ�{����3~�E�ʳL����un9 �� P���1؇i�m�p	X��O�����@/]�t�Ȇ@;��5C��L)I���H:�~�ꜜM:uMz��܎e�^ @���ڵJ��R����3޵�^o�������N��-�^��]oQӓa0�kݠ�2��tJ��@_�h9U��^]L��+sCq����N�W�N�"��BY\�CLe��WT�$����L���Z@3�8�t�W��:��-qWo��
���tSm�0���5�*a��!�Jq��?����9*#D��g բ~�ʙP���L��?�=�םuc-��j�0$�1���Iܼ�����@����i��ܾ=�8Y���q�_��r��)ʰ��H�����i�$�s.</֚�#$�5h?��:,1M�bzWj|���r��yx�E�S�l���)�� =<��N��$)�����Cv[���3}��z��0�N�:�&��850���C4`�)(�@��ZH쉆Z��|��'	:2�V ��N��$�b:u�SD^��B��Z�.����H��y�2�J���V��C%��DB�!��0>x�D*��&�+�X��&���Fxi�2ZI���ܤ�4
53�o����i��.a:!�"Qy#`�nP'�k�*3I��sN�6΢f������h�<�p.D�LF�}�%��E-���FQ�Wȶ��ŴJj�'%L¬S��n��Qm�1��2P��� C�GJD[�tA�����k����;F74�/��������J��Lh��L�ɮSV>�D�v�.U&˺T�#"�<�ڲ�T���H���u���ۋI͗���
y�;rD�-����b�����Q�C~��Ok���1`�_��b�c�Ym��e�YY�d]��^i����D���;�8��W�d(��D1)R�=��br��=�7�;����ӊ'�%C�ӊѣ�r�)�q��ţ�pyYq,�1;�J�OP���y�$�5K��{f��$�K.4:=wߝ��=���<�_^��g��i��.}00N�ƣ
�/�%9�ֹ*+�K�@��_��6W*�,~r�'l ��7������o �  ��+sGѰ�`�M��b���F��	�pA1���h)���Ձ�
�K.[��b���C�ݸ%�^.����*�ҩ�/��Ӥ��_��X�Vam�R��<@M2yB�TUiWȬ�ϬM�cAXL6S�H&]�9�&�"������\��UG��3�[t{��5M�|xX���'��3 ��P�x���N��]�P�񍶂jP;B�o��F�\C�1�ռ�����P8�����8bkR�C%{�9`��~Y;V�4D?�P�"��_�� ��������<��so����i遈�ic��˾�ak����<�4���`��O�C%b�!��ဗo�V������I�֔���$�b)������۫�;��`�]��d߭Sg=�yJ�G�:" pNf-�`f�����ll�ܯ33u�G�٦��H�u��,����_臫pa-V��e԰���+kZ�Y����R�!j�����q�Ʉ@;�x��:�je�>Q�l2m�T�o�at@r�?[2]\�^�XäxB�VXu骬�r��8 �?�vMt��j3􈬑�Qn>!�6�n�s�D8�����e�I��͞w�7��nf.6O�������т�k��sTF0�{��Z^c%q�)�Z�kr�a���vM�S�=���]w
L5�S��c�Y0x�d���������M ���
�o�'z�p�m�}u2,�屖��g1��_k8���14k�Q^�FF�K���<���7�^��=�m�K�V�~\{�&|���2���3r��s��I�o���X��(��'�1?�gXe~��.� M�O���7������(;~e套(�(u��}û��tU����[����}+�溭�����	aM�oN.N.�(_����������vv2>�;c����|z��]�/���3������FzM/���m���,=ɵx�����[���+�~ter�0i��(k�c�7f)(�*�%��
�<f�
R>@:�b�s��Ԓ`�U7S���m����5�Y.ި.����+�S{�ဝv<T�m���t"����$ K���98���|��H#�l�(��v��.?����ݎ�ן�5�2B��˔&j�`��ܑFم��G��#_%�.zǒ�LWE͈zk�pŀ鼕��H��뜩���V̎�Lv+:J��2��GYq�/Gr���[�)�L�*+�\[���B&���)�[q�������|f�{�J_h
�6��'�����۩dl�}�.�a*9�:F��}OT���'�#����u�ʹ(_��9E��a�Gh
Hqe��G\�m6RA��d��c�dJ`�|p��e���ʷn�Ԓ���n��t�%+�W�������!-��8�~�e��nh��K2Q��1�D�1�I�ja�bEI%�~F{���+�F���5NF�A��BJt{H�ڑ�U`	�_@+mV'PH�B�`_?�����mo��M�ײ���%��,�p����n�1��-[~��.��i��e�j�!���Ƭ�۲�Ɏ^�����?���6�������˯e�.�/��~��{�4G�ge��l��e���f�a^�f�>�S��<U��� ��;Uc*�!����4�z�U��V���S����X,s��T�jA҆�%��n��Y
��*�ab91�c zO����j�Kl:��^��)�:�T��R�R���B����2Al4�@o�x��̂��f�RՀ���#؜����-������ǁ�a�X-����JO,{����Z�p-q�`St�)і�p�9�&��W���8Kd���~�R�Pz[o�ϔ���`�U����t�S��T����o�U{��fl�+bPO���V�~&��~�51�B�jq%���*EY��)N�I��(��B�Y��K����-�m��^R����Hd�7�c�Y�wU۳������d���'_��02t:�$��+.Q�Q����t8��7��e��&�6�~<Y��n/x��q4�~�ٞ��l�eYR��ud���:����;I��f�N�3����R� 7��K��%Ѵ���L<��sd	R�V�2-�".I����o.#�T�tO'EJo��`��N��d�o��`��a��*��Ma��e�o\V֖���`�Q�t#M� ��,�㡬�$���\�(�Pn6B��+�'�,�y,P�����\#�n]PhXv/3T=�V�	�z�m������T� _3��]վ.����E8�Ε$/ϕ� ��T,U��ST��[4tPm���PqA@�����E|,��L��'yJ�I�R�D���A��z�e�*Zg/��iv���_��܎�ĵ�1��0^T�X7etm{�f�|�4��`� R%%�h�D�Rs�S%7�e7%���@P'Η��d� Soqԫׂ&vq�7}Q=z�bod�G&�<���Z����f�1p��O��9�6.xX��u���x0Z�pͲ��yͶ ���S�ڛ/Ѧ�3�q�E�:6~qЪin9����T��DT��Q��w��R2eX�����	q|�F��%l��\W����DTOC���%d�R�夵��@������uϖ&G��mʏR*�	�\)J��J1�A�h�u�bM$_�U�k�����	�;��P�;�"��j֨��rV0u��U�>ٸX \l|'43v�[�-��|>���2ҙ��򍦔r��v�9�p�pR�O`K^��3����5�%����GG]AaG���Jt`�u��-Ty������ ����$wCY��UU�U��k�{��F�ۡ�o�.�ڕ�k�XuF%�"]P�Ye%-�����&��t'�}�	m#U�Ne�:x�)t�M2j�p�L�#�*+�%�ux�k��rS`�Rhc��L��w��T{�FʖW�f�!�v�"�@�?�ڔ�e��٩<bt�����xM���][s��"�k�=�qM���Ѵ��#z혐�y��ɓZ���m.p��w6�>���Hz��*�Vdʛ���4��h�}1�]���fD�F�}e^h�A���;�vʹ��Eꤠ�uRwo}��uo�ԅ�MWU�j�Z"*b;d�]ڇ*����8���&���֯�aQ�y8mUw��J�j��	�}<G�p��%��%]��O�� �os��y��S��@㭨��#��견z���OM�j	��; o�Y�ATo�����5i�3���D"J�ե�`�/�N 7��"�q�5i�z�0�h��dC w-�W_c�ð�ѿl������J�Mj�5��8�ʾ�M-�T'@��b�w���U[�������Ӑ�U~2h���o�)c��Fu�����'�F�r;^���V��h�l��e��]-kǰs�t��QٜƢZs�6���hI��Q����I�����Q���Q)����� l����%�ױ�ԔH�փ�/5Z�MkhvMS���M��9��^fq��5;{���rMVv�'�O�����He      <     x��ұN�0����Q"�9���"�@B�RL�=WiZx|ܨ ������o������@�0���$m�Vʢ4Օ��D��k�n�'

n��oY�;��xnS���6ǩJ*���N,���Dc�����$܁/lQ�*�}v�@����s������a�_{vC*@���xH�T��܅��%\�0��v��rI9Vɢ�M�Y��ʩ��J[e�Z�I�p��N�������q�l�tU��L2�E����6.�䜆թ)!�U2v*�Qg�({)�,��D�b      B   �	  x��Xko�8���
~��`*Yo[�����w�l�G�(h��K����:�~)��d���E���y��ڷ.ۜ�9�>�4��V�l�1iM	������_��VJV7�,[�Z^焒�	)D����dM.jZ��V�)E0��J�1B2�K�Қ\0tHU�%���
M�lȯ����b�U��ەh��6,#k�dF�E.E�ُ%���)�[_3ŨL��;�P4h�ix�^�OR<��Q�W�9�|��"�A��<%˒�5��>�y�Ȓ�%>��_W���LX����D��\��dN*���V@g��fėٷ|:�������������:����o��e��W��oTA%6~%Z���8z�7
�8��0pc�}%����id�^��|��%�X�6��z��gW�3��En�%Ck�ӏ��o���o��R�c��G�pF�(Nk�?4���y�廾o�����wǑ;}'���]��){�3��N�d��w)�qL�����i�X!%|��@0�@�Pռ&�B�("���-��u<hOa�%J�� �L*Q;�t�u82�#B2*�"ƸyJt?@��K�{s�[;3���kDk�7�Bh�肴���o��ת��p��{Q0��#��-���G�Mƾ7v}'v�=��p��~����E[?v�<�H�瀗B,4�s!�ފ�5��&-aā�<��3 aTbެ�d$c+V����A�jC�����ޝ�f�|6k
Z�I��A0���Y�F��k�q| :%n<
�c��֑��ċ�@6�?���oM^8�'�5��u[p&�ƺ��C��)�R��)N5m�4���4KRQ�,g��0Z��(E�y	�Lb%s�=v�=vۃmO�t_{g��j�w��E�1LI�Eb�q�c8��fL!q�Q8v�N��<k�$�ݬ3�+�F����!Z3Vr��o�B��"����%��k��k�PǢ�C)�!g�vd�-E�!�M�\適@0�Y�03�԰�P��6t�@d��kt΀x�57�mڙn�-�"K�O]y�r��ԐG"_��+dǣw��E-�]5M����v���h���<q�>�S�t��m����a#�x�^7�0����\�^�#=�^����;S����F:��?��DjM��4h�vӘz}^� KQ�>o�\�h��77L	o+A����sf��B<"t
Z��|�S
�w�4��Ð�2�Xt�M5�W4������sl��L�K
t*�I�3Q-"����9bGT�;�T�~�箙3��@_]����@ݧ���c�����������=o�A������H>ZB�fh])
j��#�n�P�$��e
��ҝ�SL��՞����� �ڠ�Vd���j���ݩ��CE@^��~%"E�l�V_��E[��3���l(��
4�7:s��Z��E���jzy��\4]��Y&J���¾�#���w��--�~�i�S��ҁT3�x���xZ�UW�߾|�g��������������d*T�I��g�C��b6�e��eh׶����4X���7���̑k��0y��f�x�Q�#n<�t�;������?�.�n�輪���u~1��l�ܥ!z{��:�[�UL:�&�P���4�G/�읱BFm+3���Э��7Jh��(9���P�7�]���v0����l�С)�l�Rt�X�ZD@/�*|ZVJ�	�m_(G�PA�(��%�%�ѱ�P�����lw8�m�۪j3z��$��#l� �����:~8�cs`���)ƞQ+U+�%����������`Hp��]Ԁ5�J0h�R�*$�6ˍ�k�n;��V@��H���2Ǿ������D�68�e���gT���+��L�P���Q��4we/ueh���$���8pΚ^:�F�YC�>
h���#cww�6�s]@��tw�)׸��\�m�����������|3�Zί�0?��%]���}�����pV�_���,���+�&����6o\;�7_�������7���}~9�w��۹܎iޡ�u�ݍ���^��@u	���c�
�>�B�(��"��G��ܙ�c�J�|�`�Q�� W��s��L��=:��	�C��S�l�#�ʆk������ %䨤����Ⓣ4�-�B4չ�����8F^���;�A���~����M}K˶�X��?J�c���~��ݨ��I������؉B�`X����έ6���;���g?�R�c�14`R�ɏ2���0�f�4�l��ܶQ��y��~�qȄ\r�1�]�C�����;�J��)�H�����.Y�wM�x�E����/R}^ ��6|H�+n�{U!lJ�3B��8���^f���P� �g�+����̸ngt�ZE�,�x0��R�:}��r5;��-f��۹x�|�~~�����Xj��:fv������m�X��7Kx��7DQ�&$ѱ����
3����l):�P�����>�v&SN��(̿�����f�g      *   �  x��XMs�=ӿG�BR$%YO��#k��r,e�jKU)p��1�!=>���k~����n`�CI��-�ĥ*S�?^w�~���g%�W�8w�m%��)^k�щO�q�ħ���WQ����ucK1z�$�3��|x��Zh+j�ʇ���^Ǎ�ۛ_�B�c�V����Z�B�b���Ó�J++�G����Q�u;�X�kcDh���ȷ~���⣎�F�V!�F�py-Z�x�|%��&�v�B|<�Qy�GXȦp6z�j"E��պn-dQ�(p��L8���t=��x�Dld�?Q ��[i��)�Nl�*��>}i���U�ޮݧ� p�i���ȣ*6V�0X�=��w��w�!b��o�^%&º(�D����<�����
�@ȝ�F�X��X����JǩiO6�z+����؄%��)�p��3�
Il:�T��X�S�e�	RĠ�*�_x��4>��2��LnǢ6Jl*��AU�+](*����QlB�dHv�-f��dv:Y,��bI?��ų��fw�<[�ͧ����r�?>���l�?�h~�>�F7-F�+�"Q�[?���h����[\���޺��뚐ZR��(fatq��[���.4&&��Tng\�p�ISb�L���PW�� L�M�Xx�VJ�q�M%q�gh_Y��;-�X�2r�5��	�"�lp82��C�e�p�x�fa�a�eYi����L*����g��hBt[dt ��$x^�������5C@��j���A�q�i��Vc�+��(�u����>��(e�V}��J�ؒ�� Z�)��A�sS$2�b�qT�Zr��0B��rҦ�k�BH%�� �ܩ���g��oE�jD�sN���lm��]/���hR)9��Nw-�N�U�F��ma�l)*�3�3��9O �Nו0���F�K��@���tH½��\a\P^�sM֍-(^&*�e�UOI�m���u@��Z�%Q9fCުb����>��ji���-��q����Z.�%P�Sу^�/y�'���e��W5���	*�$��D�w�i�w(m���#�)��C� P�d�Ҥ�n���]G=�g�]��t�6�Px���6'����B�ݏU|vA2��Zv �D>)����Ӽ�V�\W�!O0j�M��]�jl:���i����a�iȗt��v�ε�Hk�r����D���y4 �ͫ���(�qN;jE�JZ �� ��80�c�����XK��*�Sj�T2nŮ����0+�mCj *�t�J�	�	G���E �W��r�!VȱJ]�s����4��g��:�%oy��K�VG4Ɏ�w�}@S[���vKy��+���w���Yų��~T�D[�݊M��x��!F>���Z��mܸ��
Ɛ�-U"��
whӨ��y|�N~�
�W�LjCb�`���E�D� ��v'�Ha�<&�z�G����׵i�>���_�[H�e.��m�����l�┈��ͨȚϱ��k�6$&O]>e�-�;�e��N'���|&�O���r>�>Kj������|>��笖F���ő�Z�f����2����9��r6����/��N�rM*�tt�5[�=�u������zR�-��C�ޕ$�]��]m&�!hx��n'�6-9�V ��23u�� �Hb��&�̻l��p� &�Rl[�^ۦ�L�%����&�b��1|�ni��,����w/��/�FY�/��I�	�ȋ�tEC2֎��d��ߩ}���A�
o�$%�J��������Ӷ?aU�r�5 aK���\p�M�Qh�	���wȞ*��@�iK��K7���lh�θ�I��؇�By�!��!�ϣ(TIj�3��ˋq��><�r��]|�ƹH�x�$�ij�W�������c�=)pcK��6 ���0a����h�tK�>����B`� |{hݮӒ��S M65��ʺ��r�ﻭ�gTY� 	3�[�u�{�e�������SO��E�â�R~~_��w*fx����`o,~�����g��[��c���L�+����W4X�v�2n��C�T���+Ӎ��+,w�������챮��<׊*5)�&l\q ���푈S��3�Ե�}�8�|�Y`e9����w�ѽZg��x���v�/�#�=u��ƍ�#}t��>{@�].ggӳ˧w�����G痋��Y'�n��=�7��.      .   b  x�u�Mo�0��ʯ�}��;�uY��ЮX1vɅ�[�-�]#�����i��A���^R�p��Z}3�);S����FO!�=F���[��w0����3���-�=�%Z��`jn�0��`FM!���4�Ʋ	�S{���h8x�b*]���t4&<5h�X��_3��X�X�dN9+�0����$��MvMʘL�E�>�Dx9�L�K��7�һt=y��hl�����G��s� Ӡ}�/��B����s�"�B�T1N������$SBR��W�<Iy&�$-����0�Z��;|����X*G�Z�x�8W�����Y�
X���ӆ�Y~M*x�g��p�k�o�f��f�fݺ]��_Zirm�{������g������[�>�}5l��R+vk���&v�<�<�#�&m"TJ2��ZScg�95��������u��u/8��m�oK{nS��.U"�ȩL��S�D�!9'm��+|�p{�����V`l�0M�	�qs�3'�P�߅us�C�������;����<�Z�XDcJJ�Z�F��t���	ѝ3h��!|{�˯��=�����{sxR����s�p��ТPBP�e�O�Ŗ�V��Jw      8      x��]r�Ȗ��U�1ѷ*F��_��Cߡ%٢mII�n��DB$� �@�觊�B�t/a"f��Zɜ� )R&��L����P�$&$~�̓��p�[�����#Vf����]XF��>L;�u�9{�i��a�6,z�o�eC��"V���(n�I2bE�M��S�|#|;���0-m�:�YًX�^����$QXD���5�Y�Ӹ�8K_bR��� �n�$bô��l�>T��Cu�4���^X���3��D�yԍ�a9�ͳ�y� 	��,�W��'��Ȋ�,�[ؖp?tġ�1.�i8�����8�SDC���rY��q�������ܕ��(IBv6̇i7�K��k�x�:�5w��B���%I�-G�1viqg%�f�#�>�ϣ����=���ݵ��?�]����*a)o%�wͳ�{��uuzqyO�����2w���q� ?$I[{޲$�KO��ҭ-.V�sR�@���G�=�^�`���w�/ܘ����y��;R�1weq����(�G�.L���0)����4�����h�!���4IҟЗ���j���!{��Q�-J��߀�m���t���j��cۑ����g�ն�*�g)���5ӽ��y�Ѷ��;�R5�ҷ��h?�e�ݔ�(ä�s? ǳ=���
�!�����$I+�������W���z9�9@f/O���<��S�\��F��*��z)&I����t,O�w��U	,��>��WY����zUz�jHǖ�;�I0���&�Bj�Oʼc)���>����!���Y7��=�EQ������[j�h�]��Q�cg��MT�{��6PHu�P�-�~4�y�4�,��/r�{!��,�Ϲ��݅.�#l�/0�sIc���W�F}��|Z �5��z��7M���eI�{���q2�i�!��q���������Σ3�B�t����n��]T��㔁4��:�݈��8�{E��Ey�n�~����,�O�a��S��Pu��a��e�(�����x#L ɴ���/�=<.e���dÒ�����&� 0�� �)�&,�Ra���7�d)���B ��:�;�z�#f��
jG|�s.	Jr�})^���Q�0U@ʉ��˪�@��$�\r��Sސ����$�� 06z�[[zu?�8���B����m�C>�>u��%,��0r�v3�GI��7���?���a�,qTGT7LUYJ�MS�8�#���ZdV7��	b��a��EVu�P]ǂ抨n���hZf�P�E��ơ��FOT7L���>Du�T}�����9�3��n��J� π�q����<�
�8)���@�N˺W 	�3��ж�zi�ǽj���l�'��0�I�u�X��lFa��w4|���,���~e͸�${�*�ŝ��pW�<m�$x��s�$I[(���w7�|�:O\}�COfmH�ڐ�ُ�8)�;W�5� �_���N�q�����}Y��\Wzs����N�d�O]✖p��s��s��g`��k*X��{B�����>4��>���Κ�Msڕ�-�C�����i���j0s(�9��QOY�g.�n���>�X�����}��x�48�l����E�d�˒�Ã��
O[��i�q7.��^�aZ`V
v�^�]����2�2᠁�~�'�#��mt���m�����בS=\�]}V�$�������E����q�u����+�8I#x�d�C�����jr���,w������e��㻏���=e/,��kp��UI
�c;\,M������|�[���Cs���S����j/�Tq�l��!�vf�ߙ$�m93�}�������,w�ӄ���4���(ˇy��KÃ$]s�:��v5�Jrq�@y��$��u09\�;��zS��ao��&���l8r��qG5p�<�*�C�j�l�����==��-o�y³��O�N?7�5�U/��0~�S��gN�3
����0"`��>�`��$O�"�����9���9�����>�ϣY�S5ܱ}>����<^[�����aQd�[C~?{��9��!TCK[�9�&EBG>������$_x���x��V�9���y�-f��8�F�
�:��PW�x'I����&I�e:�O��}��Vwt>G݌}�n���8t���7�N��zf*m&	��X��K�H>a�[�'oâ?,�:f�6�=��%�ѥ��U�9���㷾������E��&�g���pu����#Z���e5S�`��Ƿ�K�`ܪ�&%��ճ5�a®��7x�b���s��=���M=R�$)]�)Y���N�L����q^�,�33��(�+N�Q4�DQ��N��װ�e).��eT�A��q;e���ԥu�s��;\�v�ƥPY�����ಊp��^G7�0�G��f�����;˾�I��yM������˞y��f�K�=z*8dMx�[x!xt+Eo�q]2����-jûf���7d-�����lЏ�־�)���m��s2|�4���_�
H��B�l>�Q����������`L���2�T'e�d�v�Ҹ�G���1`�FlW�иϓĨEi|�{a�rO.K��͉�p?.	����z�A݂��}Lc|�s��`'�,�mv���q���L���y��/�O���2�9��1�x	T�WYV�����d��@X藎x��j���|d�D�(�>�
3�,{�Dɻ0�H�Ʃ�։oo�_!���v��-c��ј�/yw�J(i�d��{{,��gI��ri�݄%���1�u�d���_����Q�YA��&y�Mo�%�T�>����`T�n",5�,I�.�#�N� 7�����^p�}��W�����i��{��}�p������%k^����H��,�[5��Dy�(����4�s ���I�/��Cs��P��?p�y�-b�,�Fa��������+T&�x��5�v@�%T���`I�}W�^��a�������܍�*��@���I/+�{�W0ut&'�([6dy9�b?���h��:���7��9��`�p�Y|���`e���F���em,$�X�.��Y�p6Qy8y�by���=��B�N]	�&���\��h�_���ח���g����94N`�Ώ������W���_��6S<,����>���h����)����`y��܋�h�p�y7d���"��̤%N_&�W3/�{U+O�~oG����᏿���,��.�+�A�x��+��M���_�Ñ8{���V�����@L�� �6�?�8���Oxu�9�O�z}��G�����qר�BM"�$Hh<�<{P�f�;U1���ahq��f���<8�����RM3�)�u}ܗZ�'���7��k��'�'�a����hO���:��&.�d�R��Ӿ�*�<LaT75w�6Ae�����.F'y���CJ)PJ/T�m�u�b؈�P�j�7��kc�ˆ���2���a�j�y舆� ����U�M_w��6��>���0N�6!��M�0���w{��<���1��<�;�<����������.���w�;35�M���2���U�;5%
�:g����Y�����������-"����@�;f�?�[�lhLzX�r�&`�wj:�mc]�� �"���"���>�Q��c��JV�}h?�����㴔�(��+�q`�P�j̓�KCC�p۱��8�Q��p��b���X�7���"lY¤���N׫��f*�£PJƝ�a
���t�\ ��5��C���p�͆M<��m����4Iͯ�ͦ�O}�;�]��;��z�C���N;����Q��9�{�Z<�iƄ�ٕ�#�U.Z��$�@K)4�V���_��>t��z��ނ7�*���N��sf|rBa�w����I��2��͹ �O�/�`����'Y��a��aZ��V�
�����8��|��$� �_�$��L�Up�Y8�XY��!�2CT��}����$n4��p������*Izx�ȑbY���3S�������S�'�M(�7x�e_�;��(ܱ��3M�vi�r
~`ag�P��WX�F�א}���Ɋ��	E�w�mW�+`    ��lh�}��&RLϵp�>�Ww9́�W0����]�ܺ:m��.O�U� 7��A�3o��� ������|�kw*��j�e�u�f�u8A1/��0�Iù����͗�B?37©�Wa��1nƛ�y�v�Ld7*��g5�`޻=w�6I���fʮ�>�&��~
Aӡ]�$�_{8��ދ�������_�8�˸����V�����F5��ɳGP%ǒ͝���q�.p�K�k��}��Vn7��=�"P�t͒Z���f̌2?c7�>��	�1�97s�o���I�qњ���)?ܒ�G].��L��U5G�^��Lu�$�u�ȋ��ߴ�y�s�s�O�u�82�з����14��ލ�=����B8��	�d\14K,��0�BO!���:*JxH�+��C�vV�o���/�W���av��A��o�f�'�P�� ~�Ǭ&�Dܞ�C���(:��Բ$͡�0���ݼĺ�x�9�\�O�[P8�%N�'PI�SX�T��Ta\T^_p
w���aI �ev��[v_\��8������nn-&��f��"|�W�4�C{f��m|;x���+(�Վȼ�Ⱦ�����݇#�Gwa�T^�0=C�+N�Ί�a�}����T1\��p�wB5߿g�/.Y�Ç����u�����b��&[
�\^|�>e./�\6�~e֣yY	UWف��&V�AV��eul�ETռ$N��&��mR:q�IXd����j�;�;��G����-f���_ۇ�]��=j���TA+��ڱ��ф�n��!$�uc��\<a�{`�>a��4a9	{��9����Kt�F����W[�^7v�������"�^?� �����+����s2L���.�[!a��D'b���&U�q¾Q�
��	�[��g����$�V.lg�謖ٰ �Z�E��\�\�˒\_H_�)"���Q���|r��u�^�1�+��M����݂�y�0үx��N��~�������5R\��.+�_5Ϗ_]��9Q��~Qn=�YK��;j��W�A~<��`g�I�*Vӥl�B��#����*��I�% r�R"�dr\)KSkX'ĵh6�~���M����[��׏=�4��j��=jR�ǎ���z�ԡ�H��Ǯ1�a��kьm��=ˣ�^?v��ڱ�z�&�uc�檟�4.%�{��M�l�^7v�%��o���G⚛k��QZ:zƢ�g��������ifv�v`�Q vmsi��A ��޹���ٜ"��A��3��N��K�|�y��aĩ���E�,M[����[�fT?��R��v�cq�G�;�>�z��:�%�uc����׍]Y��s�_������s�X����-NB/�������F�����F?���7���N����☽�Z���0.�L���.�>gU��()�:;a�YnG�cJ����ɲ{�����b�M��wQ:
&��Y�^�!�{����/��$��!j�$���;b����aR�01�·%�g��d� ��N���ʁ"*��������Wo�I��,Ű<f^t�o�J[��h?Jz0Rh��1�h�C�w��Ѯ�6z�&ص����Gxi��kv�"rO_�s�;G�����=t�1RtC
[soi�+=�����b&2��0�@�gB�}�.�>JB���B6}���"%j�i�� �u��p��h�D���D���zjM���q=�h�D[�p�L��a����*nG�NF<�����Q���I��	��D���}�݄���2�S�7Pa��IXNxL��!�g�ؿ@O}|�*�L$	���0>�-f��ݳ��r�8%�<D	çO���bT�Q��0�8�ͿL�e�a�l���Wf��f���v	
ݙ�b8ub㸌�2�9��fA҃(
Dqѫ"��c�x�b�T�1U|��F��*�1JI�S��J��c�<>L��*̗����C���:t�IBlB��{�ġb��d��S�_o@&��՜Ԝ83'��7BPͩ����`�%��Z�۩.�p<�F/;'�٫H��*��j@��,�J��(�.�*;���-�ʎ�"q+��c�h�2A��*�š�|��v֏�F��y����(��Uoؿ������L��»��6���0IF�������1B=���l��6{�����:l�Da���ITF��}Ʌ)(/�]�#�y'�Xͳ��l���G���G:,MF�I��Q7��Aʳ�y� J��T��'��Ȋ��U�S�B��g�5�t�Y�� �s �pf��}����3�X#<�be�x�ソi]��?j�i� ��m��|�s�#̘4�g;�M�O�\�U {B�Yžu�|��Ɏ���鞲㲡4R�z�}�4�F±�c�y�9ҏ��p8`�;��q܍�0aד���VA퀜ZX�g���r<����؃��g�F�l:��6�����ML2�n�Q0I���Y�{��]<W����${��C��lJ���:ްwq7Lbs��C!�ɍ�ɺ|=7׵��]�#cx�F l����LN�vn��hxl-���%=4��s�D��C�Q�K�z[b����g�7�kk7X���\{N�Ϸ�BZ�O�e[�JY��[�5n�#�[��Z��|��]��-�����}�X.�y�F�C���o���E��E_���%��ݧ>��������{�DF��D��s�DK�<�M��C_��DK���$��}ai��5��
�G��3�i����A���A�^�*�')����/f����Es@[���!�[�XY�m��2�-��m��\��}myDk�]��Z[��Y�������А�o����"��%��8^!�[¯,N���M4xx�����?�-r�I�� �8Da���i�� �4I#�)�!���^���@=Z,�	'e~�2�P&x�*[I�4�A��`���讋��R���-������}��Ի������-��c4~�}��o���M�m�>N��n��Fa�^eE�(vcx���~�R�@�q��j�ֳQ�I����rY�/���s��Aw�g  oâ�WQ�[��S�q�Ҹ��'s��O����]���]h�u��N�x_�7��p�j�`�g�VI�*m���$es��7%���H_'��fE/�4��yf�%�Y�?�+����b��U��'��U��!x�#�HEi�NBS�^eY��f�q��k�J�X�y�7��w�=6��	�3��vL=��ٌ͠&MzU��5>� �M\���e�}
��ͣ�h%ǂ�xC�9�M��/��"Z���������\wa] ���vĦt9*H��1�x�08�X�̐RR��L��J-6�'��N�0){ЬG`v>E7q
]f������*������Ф�Y?���T��|�}@�f���n�	Pzhڸ��a߭d�aГ8:���^��]�)g�E�é�,L����p�[����h�Ր�� ��P��ec���+��a�bԚ��/gG�_�T�ȂO٫�ɟ��܋�3���/��t�M�>�_�If�*I�d�~�}tM^��S>[�CQ�}TAmW�\C��fI��*�49��/�dnQ��f�� _XT�/h�p���L�ޅ1�)��t��aQ�݈�<�pŃT��;����m$n��B����z0b`_`�<^�>d�&��c�V���o��c�:nn{��yn^�ƫ0�� c�C��~�:�>9:e��Q�5	�V���.+�_5Ϗ_]��i���ۦ�<)�p��0OLa��;j��Wa0�I�4j��$��|<�Ѹ��q��/�f:$=L9 �r%N�NF��{9i���3�U3Ą���
"�r�q!N�N�3>������U� B�tt���C�L.�&P�{:���2�{:9i����S��:�{:9m�����ss"�tr�q�L�N.0Nŉ�S�I�[Q��,r�8�&rO''�#n"�tr�8�&rOo!ㅖ�="�|�P9���xN=�r�I螎N��D��䔥��=��k�����,��=\`\e�'����G�N��D���:�$pO'�kH"�trڸu$rO'�Y�>�,p~�˒�=t�h��    9�0N8���EN�PD���q)G�NNY�Y�q&F�Nα�}X��#ѥ��)lͽ�I����_���&��P��/B5�U	�Ty�r��䄰���%)�����o&�GP�������1Q}D������r-�?�����I"�tr��I�N.0^�ܓ�)s\>>~���!:V��vĚ�v�DyXf��L�\����'�,J�7�r�d�� ip���:3����<jG�]�B����8M�\8�â����r��9���E6C-tvx����+Q��.'ι�v�AP��2O�ɥ�8�a>$=����b�!�
�����4G�	�f`�����M������7����9�O47BSs<QM07S��~�����:��L�G�	�f`jt�C07�E�
s30=��C073@'s30��Q����'�ё���6M���x�?�b��T�7b\�.[�f`
��B07S�{���
=������Ą`n�k)I07Ӄ�<�M���bT67E3�4��LF����La�xrS,�qE47CS��(����G���4��f`��7��w����L�P�`n�@�^s30�E��M5?A%��`�ЩT��S�z��?���A�S6�K뢟6����E��6�20�܈�Fh:x#���i|������4m��B�zs305z�#���颏���:�#����[d27�2@>s0��h��)����)J�}#|�V�fwa��X�윽GY'b�0��Nt�Fِ�B R!�Eq;L�M����;�)���?��ˆii�נ	�H��K`�6H����$�k���2���J���m�Dly��و}�>�ه�iח��4�g&։���rv�g}��A�P>��'��<BQ(�pIa?�t� M)��I�P�+��I��BU2���EZP8�3l��G��(/��0���*��v�T����7_�����?��*�hrs�%7<����)�QY�E�W�������<���՟"sަ��s�T���LB���b�9��Y6,��i�~Ic��1��R���fT]&PX�>˳1Uy(��Z�ܙ9��r���஭�`q�gs�9�?3��_p_�"}sqq�^�?���4�[�����㿲�����tɚ>�o��+�uk�"$x���v��_�h�EJ��o���>�����b�� {���`R?�V��P���,U��/����b;[�g��I	6��b�O��5�y�&�0��|X�
q6,L
�-��p`�o���CT�K:9�tow᫷�_\Uc���fD�
�},�T
�mB�Br��3d��=j�Bz�RӹF��|����u�PCc��QT�#,;�q7.�8^O��)��(�we�5|e��(G�o����eW�z��y&	��m�oZ�d��|�2�iT�Ub���^�v��ciD��v�EYY��.�������a��Wg��ɍʠ}��`�kC���]�#S��FX��2���혰:��yC�3��[���F��T�W��p����U�5^?�8������3?��(�C�5>K�4w���3"p�0�y�>��3�B�E����zV噜�\
t�A�ҍJ��`��Pt'_9I�6�w8�����7��ؔ���1P�j(�![T[�&I�3�4`��o;�\��zAP���r"(A���,�������^����8@T�m9��6��ܱ=.'q[:��zS�����%�]X����p/�fd�q3&�@��&'IZ�N�Z���h֟�w�)�)t�B�!�}�vo��׿XG ^Lc�%��W����!4��@;ΗT-�P�ռ������pҠ~I9�|.A8U§�|���'��
�7�8_���p0�(���/��������{���v�a�k�U��]B�`Ԃ��l�t �gDkmZ:|&\k��q�L����1n �Z��� �k]\���'^��Rƅ:�Z��F�ބk]\.�G&\����77�Z�D"\k�
Ѝ>�Z���A�p��K`�µ..�.�	׺�p��p���E�Ԅk]\��&\����2�ZW��	ך����	׺�8�,&\��ƍ.�Z��4N��׺�:&\��ҖO���q��i�p���3���׺�|<�B������kM^ʱhRb}Z�8/'^���Q�p��K�7wµ..�.�	׺���.J�~���>�x��Hb�<��6���xrq������L�t͆uB�n%�,��>� =��5qi�p���? \��Md�OK��rµ..ㄜp��݌�uiU�ĉך�\�*�p��=��qItQM��ť,�$[��q�M����iµ..}��uq�cm��.-�:�p���3α	׺���*V��>I��QW���_�i'�G3�9�>s��P�ڎ;�ra�F?2ڳ4--�W��L�6�����%)����俏Q+��ť4�ʸ�'���{��SWI�X��s�g����c]���#�)B�R,M
��I���-�J?�R�N醖s�Y'y\y�<H�4r��g"�콐�{q7����m�D�Ϊ����䳠$�u�+_��xQ�*���to+t*���gZ��$�������$(�T�͗�eN�z��rc*�U��,��l\G�t?��>��؞���Z��g��g��>=˓+�7�a�&<��E��� �	�&�m��h[����$IA3ؚ��I�{�ī��͘�����g�##f�#�����;|Q���b�PD7�[~�,��6��,��_��YfB�a��w��~T�?����WHK��r]I���i��߭��o���`Rgn�
6	�qV^���V��{w�X�`��F��$B6
Y24x0_��<�Q�b�>,"�Ԡ��>}�h��A�W��-�$���e0d�a;N�~v�J�8 �O��e&J |0M��~���#�`���f˒���:��N(���d�b�0ބI�]�B��u�b�Pf�EZ��8�&-vA]��� �g������oqAZ�xZ���)�e�� �($�.Haܢ�� ���$�.H�0.I�Rh�9CR���95�����9H�]����$�.H`\�b�Rh���$�nH�1
I�R��BR�
㸐� ��1$�.H��3��.h�a��b��M�!�b�0&I�Rp���� 7��H�]�B`�"�b��M��D�"-vA��Lj7�pM-�b��0FI�R�����)����-��ш{7�U��P�1��H�����#�Lʢ1�nT���H�]����i$�.H�a�?�b�0�I�RH�8�'-vA��/I�]�c@Ў���Bb�K�b���%:��Z�Ђ��	%<h,���nhჅ�N�nhQ&-v@e�; �������R<?V�H��䍃	i��%����H$n�T�jP�=�&����ۚ�I�K�Ϋ$|T�d�A�����$A&�}�}�q(I���B[�f�wC
�Rd�vC
�"%vC	tM;�vC���%-v@�X�l��
�R�¢��;"��<�b7�P��u���B*�JR�!�b�nH��(���Ҥ�u�G��Z/��J���T�\����Hh�i�^[��J7�o+O/N
lG)�>:I�1
��2
�����*N��{~]�^C�̽��l�'AC���W���.����ʲN/��1��q:hp�v��3I�#�4IK_H^	 �}S��k;>||��u�>\^}�<9;9�f�/.Y��������y��޴�[�<a�'��ק�u���u���5ϛo�k������ɥ��
.g��೦�%=j�o����U}��509�x����FaR�о���7Y^����˞!8���ѵ�dc��{hf*a�e	!e�����8��M'I�ু��v&)�����s����U��g�LNZ?L�ndL9f)DUΧ�B:X+�4˃��V�I=3�W|e�I�Q\F��k�9κ`O��� P��D���g�}��8�Pv�8=��6��B�ʱw1}L
���8��
�㓳v��ܘt �  ^%Y�k��=h���MU���y�?`x[�z�A�t��bfy'NC0����eEi޴w{ ���L7�zth�
~e������cq�p�A KP����(�r��5 M���;��U��[����+�G�n;1KP&�xl���n�c{�b�#Y^m�3}ӅI�����b��C����W���o���H��~+�]+ {�%��Ź&�ہ�`�+��I���C?^�~;�9�Y%�[a��$��o	�	�M��^Y\J�������n�}��H���(��~+��,��� ��m��ah���o	>7���V��>N��^b�qb��&�8��
{P��o����y��V�{&,��
|tbD���r��o�}��h�+�	J�_X.m�{��Z��V�+�J��^[��-�wM$\�����%�[a��+�1�65�[��:#���&� ��
|i����W��o���h��~+�]����o��>ۈ�V��&n&��
��"��A����o>7aI	�V����o>���v�c�pb���	�F���4��%���I�_8�1,��
|��	��V��Z�-|i����C�`4g���BK�<O��-�� M$B�e+�HalTb��ڢ6xK�]q��o>�!��a�cPMb���n$��`/�9��aK�.����a���lH�ֳ�%i.�gꄰ��+��rx��iT!{��"��38 �����s��$�![�,ɗA��q�@��x��̅4˳ΰ]�3�+?`�B'�ӈ�a�UU�\v�< ��)�Q��N��W���5�+�	���^%|#͒�;�FN,&A�
�����d�c/��|:���pu�I�W�7�tr(��8jYE���Ͱ���oX�ZE%+l���^���䃪���?�[���J���I`�~�n^
 �0n�Uv[�c�Ɠ�Y[ [�ǰU�p��8��ư%��V@�kb�bP&�]lϬ��zh����]�*n'Ѯ��r��o�]mnY�z,	���L���1+0�ipi��^�p7��5?�(aoP���I��&�&\*����hy��.�%����0,������v=���L�k��MHS�]ln�h�zh�K��-MLp�]me�u�zhk��M�끍.l	vM�=��H���cXW�]���T$ڵ�v��H����^Y�]m�!*	v=�%Ƥ$���V���`k�PYmD:D�.��&KRm�+�z`,�`��s,M���M(f�]mab/�zhK�L�끭L�/�]mm�B]�]7�h�C�3�v=�}�NM��`8j�]l�11��v=��	�K��-0�4����Ȍ��ZY.Y��`kˣ���`�!�b�Y.�`���Ǻ`��JvM�\��H]���'���� '�1�.�0��Iֺ`�K��E۵45�u�F߮t�.ھE��b��D����9��뢍Kc4h�����.���r�j�[���D��0��&�.خE��b��H�<Rm���z`9�`��;&F:Ѯ�6��d��Z`@b�]liQ�XkeB��zh�B$��	����	v=�=��h�C۷-�;�>�5�6z��2�㤇5`�*X�o#1���+�?�/�t�Z�)�d-�
��~����(ho      >   -  x�}T˒�6<K_1�ue��%J�����T>�e���I$$�@���!'���$Jr�6'̫�g��ӠJv�G�5K�tM�az�j�*z���޲��*��[i��<w�Ox�h�T�v�r��ۗhwį4����q�{|E[��^��#A�5!U�.���8%�1�;���!�V�vp���8w��W$tI��[�X�S���}25#��'3X2�Z}F�����y�U5Ҟ�GmpT�I�(SȆ]x
Ĺ3��LEQ͆�5�t�V��?�"��t���Y�G}Y��8MI�HcJ6i�I�(��_��L�|���J*0r��kTO��[Ӈniz5�vC�;5�ϟ/HZ�@�N}W�Rm��7����� D�R��g�&����ʡ!�q��-9�f��F\Ӎ'Z���c|"���k��p�ԓ9�Փ>��R|�������Ag�5�R߳�4�
���ɽ���bu���&�VEv��+�|y��@�4����K��V0 ��gj��"�ZC����ᚅm�pѩrἨ�;��҆�<ϲѦ5�xf��
�� ��t�#OY�8`�=_c��&�/�֟���8߃D	�վ�a�.�
�"��/��.VYR�`#�7�2Z�~f��4/���7�e�	�wPԮ�|��0	��n*o��C?]�^W��hi@�*����d���VO
�1B�����X3f|���!hP��ȴ� �I�X<`�P^o|X/���)<�n�S��T�!�\yB��>`�&�UV��ן��'���
�`�{���Q��i�E�Z�.,d�8_�+J�M��,�(���^0�������k�m      @   w   x�3�t/�LI-�J-�/-JNUH����u�t�-���L��L��Hqq����dg� X��gj�gjh��H��1g@~Nfr&��"��,��̭���L0]�*����� ��</         �   x�U�M�0F��K��Tc��0i��)�Vn/�D��l�������r�~�4g+M�S,Qsuφ>�b�l��$Ͷ̃�01�3n84R�֏�/�	�N�J^{�xr�o�ҏ�$�C��CXb� V:Mm�.���J��y��1/ElC�            x�u�[o� ���]\q1�<n�&M�^�>NBĐ��6�����w���E�*���?�`��RR�NU�U�ӛ=��c����|+��ϣ������Cͮ8f���o�\6�k׳�����WB�g3[����0��s>�����(-�he3��=kJ4]p���|�F0�0*������+Q�GN���ͯ4�F�h=F�F�Sn������b�ྚ�ԗ��	w{W\O⚁5j�ׁ��(��=��Xb�]�^Do��!|M�A�h�Ms�LO��L��<$ � �;��Z=U�����D1E=a�5
�lЭHS�hC�Nk͠�\f
T��z�Y�בB��T�@��dvNA�4��G��z�pf5#M5�I�u�V���a�*j70�<���+��x?|������YKo��� ��:G�\x���zw0���̇�a\�9�]���%P���*��ŝ��)_>	.�p��-�-������"�A{Y� ��%�iPG�}D��=�l�?��L�\���n�(Z�F�<v�O���RG(����h�2� [�z�b9\�Ijȣ�m6)��R#h/!a�20�a�?0�2P/��.�d�<��	��5�2d���>cS�<@�>��i&L\|Qc��j�CĠ}��V~�#( �7u�j�f��ذ���Q�Y���*��t�ja=���^�::�4A�f.{)�����WT�[N������tQx�#�.&���y���b��矼��t�PЁHR4�~=�N���x      ,   �  x����r�0E��W��B��Ò��Cf#��"���#��i1I��6S��VZ��⎡qѕ�t?\jV�q�><\���^����7L(������9��
W�o��*��x^p�ULJ;�.$�Hj��c�ËV�D!u!-S�zb>IT���ûw��5T���ɟ}�hFW�]��O��k�.8ڲ�3u.QKB<����UY��u�0T��q�π���u�YȔ��QB���_�ra�ȥD�������Xٌ̟�9W�I�`
�̳�5��������	S�I�$N
���s��������N���9�(dĝ|5�C��T���I+�̩D�<��_l��ҟj�:Z�u�P�	�m���O�)�b:�+̉D!'W>�菮��ڔ�E���|~��D������dnn��L��I�$*p�u��}E���mr8d����r�f�{��œk�㿖M�%H��`ɞ(Tr����;¤�P�m��zpqH�t�<B��2O�B 5ɘ5�J '�c`�C�o�ˣO�b?g<{b�*�c��|ڱ7f�����)Z�L�%z*Q)���Owm�ډͥ������ҙ�a�������9�||u&��h��������Zء7� ��>.��N^ɪD%n����O�ڰJ)��J�R6堰��aC�Ґ��&�%��ocA�n*L-4�1S�R�Ғ��w��w��]���Z�A�HPPpͤ���$*+���>Cn~�m?|h<m�L�KT��5���5��m����B�Y>�/%���h��߰L��CBSIf���5�*I��}l>F�ټc��C��1I�r5�.%��ڈ��[�pz�־��Wi���Q�e3�B�J����
?�>���[D��d���3q.�ߌR�H��      F      x������ � �      "      x��}Y��H��3�+������B�K=%-H�"	�66b�$��'�+���g�U)�,���w�H�B�f��e��f�#	��;HvA�n���{D�t�V��������7��@v��;��9�$nwy�����ʱ���j�]a�nd�z�$i�Bc�i���E��c�o����?���P�g����h�A�$%�W���8D�2dD���(�6���3q�"�����i�j>��x��2\�n*�w����T�׾P�II�ti2��l��	��i)��i1�c����1��i���Cp�1��4���$qKQN��&�_Ѱ����f�v#�ח�f.�l���Ԅ��]vr��PZi&-b�`�8"Z�j���e�8���񙏗�}a�����(�1//����Q��=�OR��X��_8"�]db�r7Lx��F�~��J3B�������31��n��9q&�-������x���-I��x��x0�'�M��e����n��!����!�?8��8��4�
��1(�o�=�,��Ә�/�,J7�LD��*��h.��s�&nR��<�͟��T6u���Ҕ�6�C�����!�3�#Γ�OF�<�h���)��f�o��&��h%�,�&�i�.(O�/jݥ�C1���f��'p󯅛{."�CY�!Ns����c�3�����{wg��=�0������0�R2舐D���8��>���C�8Y�y��]���/� ���$n�O4O~�`A�?��ȭG�5�-ɫ����\�ɜ�E���l��#hg�g���z����J�U�4֎��#l��I2"����>&�ӳ�W�/��w3����D�5���X���>����c���2Se��l�����82J�$15�}�
d�\�����5�����-�XP�p�[%e^IA��ez���XLz��0�v�QiիC��+c!ٛ�`5ڪ$יtkb|XG��Gj/�^7�nG�6��$�}����ۦ�X�{�.�Cn����L�����(�"����]7��T*P�67��w%&�(X���4F3W藒�����_u�S�0��.ɱEl�Z���ij������Yy��8Gz9��!	�~��VJ8�¿����[?7���FH�j����10�ҿ]"�ҋs��N��3$� �d�;Y������}\9Z�v�;3�zg���L����
���,y_���K�,t�_$����������4Wh�\}{�$x�]n�fJ]V��O�#Mw(���̽5wV�q����kjO?�g��b:q��Q03�~�����<��� sз#c�o�D(Cq�i�>��6Q�b�E�	�Ha�M�^�u�\?�
�k4��_m�	�c�p�/��`�u/��ТE�P��U���g2۱�N8�b�ZK���(�oP�#Q�0J���(��?�[+Y�%�&��� �"� 癹�Hx��=A������f���փ�7��TEW��tyGn�;C[-�^7ZUA�_HQ���Y?����GW�s(����c@8i썇9	�ٟ]�h#�cpi�,�2�qjD-Of�Q�(�N���J�îfԨ�X·�j��F�㵕�G��lN��D��G�C�B� �~�vuGG�E���{H�?�	L3�������Ék���pɼ:ܛ��p�k��!9IңY�����*\o��=h�|�AQ��Uv�p��y����da<GC�J�^l.G���E8'��%(��1)i��Z�q���^i�U�$�X?�7A|�0��!0�ܿϮ��e"���~���P�>�i[ȱN���,��r�He��C��X����Yw�i�k屆Mcb3&�+/���cէ�����<MPM��)dj�9ĝj
�j��7����c��J��oVt{��T��$-�u��V�n��AC'LI��O��9��Sv�	j�����{&�x���C;'Qc^L��Eqey��t��E����3 n��M;Ev��O���7�	W�������O�j*�S�ԩ9S]�]t
�Q]f��$>ד/J����V�or+���P�>��w%ٟ�&�8�a`���!�	� �V�.R4�ߦ��nQ�-vn���`[�pSpf�)A���t�c���7\LV����ٔ��jNj\$���i�do��{�%{�v�A��o28��,
�D�X`c�%�xA���~m���u�nO�lG��̷�3��z��"Z*����r�ͨ3��rͱ��2\�>��������n�0�6�	0�r6t��P�xzjfI+@�����.�����4���Ρf���,Y$�G�x9%�Bp���Jf%}�]X:������=��L8-��l�2F�@���e�'�L#���x�f>�=���B	��7��r���6�[�������ig����M�S�O�p;�UTl��b��djR��z�w%>|�u���?��W� ���b�R��b4��+� �1�y
YpG��]�;���z������	@���y�P�t���6��퇀��Q��r�^�Y���i�c����UǬ�f�-Hk^Z�{��B L�l�(�0o�E��9���p�R��2-�đ�gDY��P@bvK��<�2���-r>1g!��Xo��e��m��\Y�M�ubW��}i�0�6ҝ�l[G]�i���hR$G�,f#�B�P�a�L�A怼� &+)@+9�/�~����]�q�{wǛOG?#���0��D:+��@�4����@G\N
^�?��j:#���߷�G��a�V<���i���8��9�R� X�*��0��U��=D
ka`&����J,+�*��
Y|I�'.��MO6��>˃��LF��v�\h�-Ǌ·�^&(AZ�i��е�����Gh�s�0hFqפ��� π8��ӻg)��<�$UQ��r��2� ���J���*o�Y|�3���F�-��
b�����KEa;ĸ6���gex�{˪�r��; ��q>5�p7H�UK�7�C�	B$͢�S��a���h�m���<��4�5|�h�q~k�;������;��Q`��V�ag�=,��=�j���� h�C5,��yE6S�c��v��A�7���N>�$A����Vk��Ô��0�4��M �#߹�JUZ�iF(�S`l�S[��a�R� ���u��ȹ�3}�#�Â�c����VU !_(�a�{??&"wcD X�3D�������\F=E��MLYhd;F�;v�wu��C�L�g�������1:gۭ�V����#4���C��K���y K	���W)k�m�&��ɬ�K9���%�_Ѫ��]Bf��8i�FU ���!��.K:��߯�`2��U}F{������R*1�r�3�l|?��y��G��~��0&C�I�����(�Dl���h����Y^�f{�#q�R�#}��-8�;e��ӫ3-�3�F��UF�T>��K|�.���Q��ʻp�10Ҁ��Jt�m��R�����	z�+钡#��R~%]�4ɣ@�F�]�>K��*sS\0W����`O�6��'��r��<��[� >Zi��<�| ���|���S����>5��m�2��x8Y|��/�\�U_���A�>ă���'�X^�;�G%�9��+
�_�~$��PJ<el�B@3��P���`|r��k���sw♅��i���<�?���N3)o����+D֔E{�8g�zoW��e:��nnI�?���l*��������ߢa��9���׌�|� bpϢ,�^z��<�6<�&!!i�thzUl�^~��$��\�T��o^���4�����L���(y�N8�vp���]�1���/��m��O%a��HX^�y�a���=�8�������=Z�(gER^M}���>)�w�uM\�z&��@<��,�񓅼���b]w<�&�}�1���h[m+�?��rs1{�x��g�>1�h��3�J�$.Ko���CH�a$hg_��S&����2��OP;��)�q�h[V,�U��c"����շ�:9����s2��[����DI�b}2싃rp�F���YB>�7�(�$�v���    (C`K$���Бo�� ��OF�!�q�kqG���"2�:��"fs���$B"��w^U�2�p�I�N��/�P�z>�j�X����\����<�;9/&�RW�;������P%p�?�2�Vi��̤-�%�N�nN�V�DրL�_�5�֣��{S�k�~�;��>�{��]�ju��,�J��s[y�W�u��W���tEu�ȷ��N��yI���xMP�Ȳ�H����;�K�bo(��/ذ�d�{Sg�˾��@�C̰��_��Z���[�gU�-�Ķ������\��{�����5ޔ � �y���Y1���O
��V��5iv�$�PR*��1��E-���`F����,�l���t`�~~4��_�s��c��4�~q,27��*�5ȩ.�&U���׷6�-��ȷ�@��zhs���$N�qev֞�PǍԕ����+��-u���G|��n���!^�I#"aQ����~�*%9�_pX��v�k2��i^�.HI ��nf��HA{t�.am�h#3���&�b���"�;�V4�1���9q=�|T��vq߹�Z�űR��N$G�X��%Y�Ï��OR�h�!S qP��Ž���/ H+r����A4��������H]�i�uLn��z��'�<�f�s0,�?j�uo�mR����{���d�LS�g`h�9��s���,�Ѣx�r�7~����_ذ8���ZC�3. �{Z4�=���=�Q
z��^K�Z�7�31���U��ی(Z�J.�sٵ��h��V���2z�H��<��xCI("b�΃_ ��Z�� � ��+U�8Kn:U��Ĺ'd�b����k	rF�F�WߗJ��~�c*[H׻����w���ã��ĥ�a�p������ը��S�A�@������f�F�6`����ז��gi�i��b OR�G�'�MąWh�^}��U���z���A����f}�+��RIuhn5c�}�'�T`���Ì��[��f:KRM8v���ʉ�_�5�^4�2cC4n�l@�0�,%�i,��*��|Z�=��|C>����;�v�K{���d�]��'���b���@*P���0�����f���Z{e�hN���>B�G�ľ�WXŹ�>�U��b��拔��Y�_,�(k����T$6]K�fO������ ���_��~uSX����I���<,SK.��pF[�M��x��;ԕ��A���өo�����G����`��W��	�OCcY�|�H*۪(�j��q� ���o�������[�*��������|�b�u�Pç�T�ԁ�3��@���iW�iL=��J!˾�X����7sOm�����9��2�M�P �5�
|��!�WCa.����m$��շu�DOA��ϝ��l�uM���p���Q.�)���u�R8	�E���SJ���ުe_�<�C�iS͡�ؼB���6��f��$������	0�	e/��?�%��C����l�sz���UNKզ��&�~��B����k�1�bS�Z��X<­�&%�W���)
�u�4��$(���2��۰ݦ��z��i�;A�� Ϲ�vD�ܮ8tZ��!\�ѮvRGf������U4�q��PEX����nB�g����
�:�����$]�Z8	�^�~K���-�^fui��N�9�;q؉�mlL�˅S���_�a�pǝ�ݤ�&�{>�"'�i?��9�m�п8
�BҴv-�N��`��u�'������劗G���;��\ߤO3�W��-��I����.��Ae��#�2��4Y��>��� `�]@�{F�WQ3�@1o@�YH�$Ք�~�2O-ؐ	a4���U9��<�?gm
la�[֋uI[vm'�6�pۚY�����XVCC��L�.���:+{�H�c� �x3�K��3�~rV8�����`�бn���l8"�k:ܮ�k{8:$�fzoX�l_�E&�e�T$�G-�M�ߦ:�+�����H�)n�:X�X�ٌ����[E�"	� \-�)�.�8a����,�$ l�i�E�%8Ǡx�b�+��H�E�ܓNT'���~jLQ���XP��8���$Z�FY0�}��^��h��C�O�:m��B�7�y����-#y�� <�$f�Eu����'���d���A�;s�M�̨*I�F{��.٢����q1�N����^�g��|�4�p��t��K�j���9w����.eq�h}�v�3���)�ڷ;շo?J� u=(�;�x��,��r{�o��Uܩ�XXO�5iU�`�N	�'s)��l��w�`�H�4���&�WH�AH�6&�q��ʽJ�ƛ?������N�>7��%����bD�.$l���#o����+��W��N$ւ9S���;��r�\���$����M��ȗĞ�����h� d����S
H&�`{`c����҅�
p�����u�.��̥��z_7@���b���d��rzNi�m`��$V�?o�%���w�a��.,��nX�n��Q�*��b��(�n橻���'���o����GjK�,�$e�D�Qmb�_�[��NS�p��+�t�	�����5/��vd�Tq]�L��qj{N}�}!9���>"IW��mk���y"�z]i�qt�zlPD��8u�]�x������ !MÜ�����#�h�[OC/<�L��Ѫ ����8��[Blr��T�[U��G�]��i���~�����ŉ"����:��m�� ��'8��'ٌlV�����@7F �I>s �E�Y � P��x����3��P���s�l(�{V�����M>��v��V{�65M2/k������J7ٻz��m��{-�����8�.!HH���4Уi� =8�yHD��\�Y�_�4�LD�a��E
x�~,���+�vf>C�i1�=a�LI!m�2. ��:�{g�5��ZPg>=�As�c�T@�����Z�t4���^�QC �hK�/�Iʓ�Τ�HlU3-	��"��V��b�|n���Ĳ&�]Ӂ��w΢��0l`�f^�kbZ �~�se�M��싸����;礬����*QW�#��9+�{���rL��{U��>�iS��1h;ݪ���d�cֿ��6�����I�<
`�g|Nh�@+��l04b���orK�ű����o�/����Qo����]6����q�%	��# k��o�� &���,�����<�H�>��2������hcN�n��/'c<8�;����*N<,�y��ۦ`��xŠ��l79dn���RU[��Q�i������mo1�
cY��H����I��.�q?��]�,�GC>����q:B���Ru�����ˢ����������{M��߭�C�%n�#�p�)b3ME@0�}q�W)A�,ѴIx��C��Ip-�����|&:��=t�A�.�p���q�c�L�4��/,v��W�9�T��8����y��h7s����{A#oRǛ��/�A$`^Q�H���� �x�;˃0�n��0@<�p�����E:�٣���b}�.�L��.a!���}!<P�p�h��o&����%٦��JN�n����4���<O��fECF���1؛�\����:�4z�J��������u��B���?��Ψ{�^809�G'�G�'�W���� f���O:���v>��~��Mʁl�v|	��$a�W����ZIP���$���m�m�={�z���/@G�<ƷMv�`��롒O󀵲�R�S�⛀+�p����g�0�!q�}1�yT�MJ��7I�O=����M�l.
����M?Mok�߷q����N� ��~���x�<�L�s�A���\Peq���~?wmL����(:�rn���0ÆR�͜�k���n�̋�I)ki�/�Gf\3"�
X33c4�����|�'S�*�J���郜�{�K��NNrj��>��������3��ԇZ�,6l�㷉�'��n���0x���88ap�ۯ��D����]?|��vP_�uS6mj����{��0��ٽ�b�/z�$��z����Ǵ��F꒙x�NU���x�����    }`q�m���f8�BA	�J�i@e�-n<KY�k7I�1dܔ��I����-���cL�Va���&��L?�q�'d�0]S[�7�<9�}ݲ�#0sfs�� �������� V�ؗ�S+J�p ��L���yC�T!�c7 )E�P�V2m@�z����"<�`AR����U�h�Έ������ـ����K�m�"UE�t#NX����ێ����ͪ����i�|����<�4v��a�����y�u��l͍|�{T��xF.Rp�1 ߽�S�!�"	��L���ߒ^8/��Ī2���\uIc�b�f�0t����Mȫ�ߋ&)�n��bD��I�H�{"x�ގ�����H�G�2���\�݄�Hw5^�W�PyUQ�W��)v��e���&V;z���|0�cG4m�1)�UJ�4}��,�ܒ�v��� �#l�{w������ƛHCS/Vۊ�&Fb���&�ȴ�dυx+k���'~�oT~��񙝘���s�FU�S,"Y_-B�-����Z=;hz�/Ƈ�o�p0�i�Zq|5�A=GJ
��7I
XṸu[�96��*�r�h��<�{������[���^��.48�A�J�Ϥ^�aU�1|=˓�e��GS�G���2�=S3r����"W�k��iA���Dz3�����,����������&)�����f�.pT���=�����aX^��Da�&$��S�b/����j��^��(�Ze�?Erq��<���d.#%^jZ�2/f#���;dD�F�O�S\-�Me���>4h�5Ѐ�Q�#�5`�#: ���Sԓ������&AXN4s@�������CB�� �}�;L��M^F�"���ۈ��\{��^l��	D�Yk��4ǰ݄'vB��2�u���D�'iǧ�8>��A��~W���4�;v���_s0`���rSxB
st�����F���apX��&��/+�Ldn��J��KuR��k�Ѳ?2��S�oF_)g��>�k�21M7��SQ�SJ�t�5�i8�0XDr�Pݰ�Ce�a�n���o#�Qw\��c�ci�Ҏ�s5B]�8u,6;[�sRE(�VO�x����ql�!k��s��&��`Q�~�L�R�'�v���U���m����y�<)ZxYIy�$q��h2M��y��w*��8�ƁLj&�݄�0�z��������\<��@����N;��H�?*f�5�Y�H0�7קjK��k�Q�^&���x�9+��~av| �eb��a�;gU�Ɣs���H�d5-�HE"b�v����|�Hc7w~}�1�~����W�>a��L[�{�C��Fȫ:#;��F���,���S���;p�5�f�ނ���XX�&�� A�Y��LmiS�R��@&�I�Y���/��b�תdz�|ѹm� )��������R�_�65]��SV׼ ��mn|Gf����֕�n���ҦS
�`D�<u$��O�<I��F-�΁Ӭ*�-ƺ��~��E�Gvj����������H�[����E� ���� �em��ڮ?;)����ÛN
�-�i��ӛ�.�@_��Mz"��?�����#�ۛp-�"�b����D��e\��Fxpw�U�I�Xo�z�\�Ã�)"�Ʃ��JIփňtTtn��j8~�0��h�A@�h���G4[���Z�6)���R�Wi��������:�:-�˒���zl���[|
rh���/d���~��}J��dn����Ğ���s_��&�+�}��g]o�}��0yi�}�.��`�/D_#�����Đ���������;�Ҍ|�8X��wxt��-^Е�
P�������$Q�N�Y�a2���@����;A�m7`�82j`;�"H�Of�Z��o����)�M8�6�CZTT�p:r`NM�\�F�($���ݔ�KR�Eg�~�/k�߭	�b����4����"V�qꅁ�$���KYݮ�4K�	��n��W;��F��8#��5f7��p9�AP�Z6�L�hM�����R�FN�K�H��'�A|h�����A14��A+jL���7�x�r$�v��rmc��=n�m��	��[���/�oQȩ&�z��;�@k�cbo���	��o�K�hH�e�fιv��<����AF�մ��)��E����فW)C<ۺ=�c&@3X�6����M����2�C��}��r�Í��[K�?zwGx؀G�q$m���Вg��X�m���a�0��А��d��c�
6��̜��ˇ�&9����	 %v�������:���a鼱�/�l���e��ٱ3�ݕo�s<�+��B���?�c���B������B"�!�aO��I��Ky�C�ߡ�Wp��� ��&�N"�Gbj�~�-bt�o-f����Rd�
7��p:0�Vy�t���~���4���1�A����f�5�M�oE�Oѿ���d]�v���:�fC��݌�ɚ�@v��}�c�5��Z
 F�<��eE_��Z��&N��\}7�jV(?
��T���Ծl@}��]�kZ�#�Oas���oE�ھ$h� 6RV��}��tݎ|��aVN�Yw��Ԭ�,�R�\��B��1���җ:�H��+�b��?M��{&W�o�j��Ξ�v�ޤ<�rצ�ȹ�'g5ana��[�o��/n��QL�U"1�w�/���ǝ�j;Yb8�4�#v�c�;�
M��^8�Ӄ� o|�"�J�``X�|na�(��V��q?��[�����l #+Rهg��i@F��xX�"o�q�/Qc����Yw<U�������n��Gڬ��_��д�ڌ-�_1�4�Q�q� �(�X2�*�̣�\buP���;�N�N�õ��5>6�.�udby��xK����nè�7R:���)�_�,G��N��2�.���C� �t��v� Iv
?��g͆]�/�%͔5�Mq��%�9�8y�nM�F���e`*�̷�C+��`�N��O�@OR�Z��k0���2��W�@l"���G�Q������i�|w�t���f�-����Z��
�(챥�vk4�m�Vɥ�}&���c��̔1�!��*0�\��*Y��fN�t)8(wn�
[u��i��z�����2׼2SG(�\���������M�s�
�'Fim�<�S
��_o�Pzr��9���@\��U��y�5"M��>�U^�t5�6Z,���s�3/��8x�j]^�v�㊏f�:r0�����[��p����������]��w�o�]�H�� ����V.����H`4;^9��߲M1[~\��U��<��sWq��lYD���ѰȰjz�
@����i�sD��cX.G�4X�ioQ������C�&��&n��kÁ�XG�VO)�z7��)�-��^E�f�dތ�YJ��s^Ϟ��BDa~lv�`��OK��w?�"���%�'���[6]���)���a$������u0�]�?L����	X?��'5_�-�i�c8����C���/��M��\;��5c�.�
d����Ha��MM��vm���*o��m��}kǺr�,��<ė��Ĩ�T�'�no�L�p<pgJ�U�����3�y�Ϧ�Q��1�s��~<}�ck���gi�U��^�v�*�8���q����GMM�K.7���uY/�n=����[lb�l���p=��R�`�
���Q�l&q8�� ���4�s�g�1��j�Rc8��K$��� .�2ף��,���7
r���e{^l4�29=����q�m.�2��Z!VB�xc��%��ґ���o����ԗ��v!�� �|aI�RP�6j��-��6R��u#�˄�c����Oa6,�����	N�}w�0�=��r�2��}����:bJ9b�HG8q=�@]���HGwA��>h�U�7)ϵ��N�Hi�e�"��b3/ǁ۱���<N�57To2;mp�gc�t1rwqȥ�^���[��.�U0��.��G�1��}8�E����7C���?�v�Փ=>KI��*O����D$@�Mx�of~���~Q�v����u��,k��[� L  �����e,�yLt"��0|��G�슮�<�w=T��Ԏ���l� �$����E7i��oV��x�a{X��%Y�7��Hi˞ўAr;W?.SN�lS�J�s#Μ�Fp@��l���b�g/=Y����{��^Ɖ��<���4������E4�$��݇��0�=�x"�U�<�����C��'`����f��S#FB�۸����7��j�M5pfi����O*�ojyT�R~}�Q5x�����p�9�z�ȇ�B��X�W)Ms��$0:����F Ї):�`�81��ԣ���ߞ����&Q���*�e��=
#��<�Y&��}B�D1��XNu�'£+G�:��8X�n�{2����h��h�*�JY�����1����4�Q@�����&�߹c����a�k�>dL}A��n;ݛMW�L��z���}b��;����DC��  <���.�k �
��	ⵥ�&eq�:
IR�$-3�np�E{�{l1r�8�{�~�Y4�YU�4͓���G�1��%�L*|�g��vۉuV��a��@NI��v�(�餍����v�l��$�w힥Hrm��n�:~�~}�;�W�5N?�V+�yX�����-o��*ʮ� X��t0T�i�*<�9��6>�#�&� ��|��2>�1�+�H���4<��you�aN��l(�a^�,�a�5�qp%A�4���p����VW��=_7"���x�'6V����H�#~�P��gS�J���!y�Q0���{��xbybdr2E�5�����	r0����p����F��;ǘ�!�d�� ���1�ŀM^�I�/��A'N9���#�uBC���dU��:�)�b.7�t�N�^��L<�Oy���q���@	�%�]E$���*>K�~.
R��v9�8ɬ� ����fTe�I���	[$���x��e�e�5�<���'|uN������W�r�$���M�g�Ppn���0(ν-Ԉ� ����R/R`��iY��0�" ���"�M�����Nd������S�t[V�ɜ|��my:��7����qB��q��ذ��ݷ���m��^=�9}�yZ�C�b �����ߔ��C�o������M���&��E���>�'];�R7��vS�M򰕇�V	�$���'��0!�O��{�9Y�v?y�E�f����y��$�]��Ե�%F�]�&�$���O�Ć�����?����8�i�ڻZ�!9kb�办<(׸��̓5�,q�G�XW��?�� �����Q�g	*��oA�Y�ϴT�x�::��,<���a�6v�sׄ���>����EW��*R�%�>Nlu��,텬�T\_Mt̎FZgǣ2FoHp��TA�'!��=��E����׭�u?4�tҜ�6��րO���a����ՋP�C�C���L7���E��Ŏ�	De�����z#�T�u�l���yP|���m������o+l��������3=N	��Ò���S54ptP�D\���_�cEwrv{ZN���g�щ�mX^F4Ł��y6S�{���G��p��wn?u��O}�')�R���������4�U]     