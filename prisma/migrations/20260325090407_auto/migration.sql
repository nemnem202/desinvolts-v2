-- CreateTable
CREATE TABLE "contact" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "email" VARCHAR(254),
    "phone" VARCHAR(50),
    "deezerUrl" VARCHAR(50),
    "spotifyUrl" VARCHAR(50),
    "appleMusicUrl" VARCHAR(50),
    "bandlabUrl" VARCHAR(50),
    "itunesUrl" VARCHAR(50),

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "username" VARCHAR(50) NOT NULL,
    "passwordHash" VARCHAR(200) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "configuration" (
    "id" SERIAL NOT NULL,
    "showActualityPanel" BOOLEAN,
    "mediaImagesContainerHeight" INTEGER NOT NULL,

    CONSTRAINT "configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paragraph" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(8000) NOT NULL,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_line" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(5000) NOT NULL,

    CONSTRAINT "text_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "alt" VARCHAR(5000),
    "source" VARCHAR(5000) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(5000),
    "description" VARCHAR(5000),

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file" (
    "id" SERIAL NOT NULL,
    "downloadUrl" VARCHAR(500) NOT NULL,
    "filename" VARCHAR(50) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateEvent" (
    "id" SERIAL NOT NULL,
    "_date" TIMESTAMP(3) NOT NULL,
    "city_id" INTEGER NOT NULL,
    "adress_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "title_id" INTEGER NOT NULL,
    "date_page_id" INTEGER NOT NULL,

    CONSTRAINT "DateEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floating_window" (
    "id" SERIAL NOT NULL,
    "z_index" INTEGER NOT NULL,
    "facteur_de_priorité_du_z_index" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "imageId" INTEGER,
    "videoId" INTEGER,

    CONSTRAINT "floating_window_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caroussel" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "caroussel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navlink" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(5000) NOT NULL,
    "link" VARCHAR(5000) NOT NULL,
    "position_" INTEGER NOT NULL,

    CONSTRAINT "navlink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumLink" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(5000) NOT NULL,
    "link" VARCHAR(5000) NOT NULL,
    "position_" INTEGER NOT NULL,

    CONSTRAINT "AlbumLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trombinoscope_item" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,
    "text_line_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "color" VARCHAR(50),
    "group_page_id" INTEGER,

    CONSTRAINT "trombinoscope_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "theme_id" SERIAL NOT NULL,
    "backgroundColor" VARCHAR(50) NOT NULL,
    "foregroundColor" VARCHAR(50) NOT NULL,
    "surfaceColor" VARCHAR(50) NOT NULL,
    "borderColor" VARCHAR(50) NOT NULL,
    "ringColor" VARCHAR(50) NOT NULL,
    "primaryColor" VARCHAR(50) NOT NULL,
    "secondaryColor" VARCHAR(50) NOT NULL,
    "primaryForegroundColor" VARCHAR(50) NOT NULL,
    "secondaryForegroundColor" VARCHAR(50) NOT NULL,
    "accentColor" VARCHAR(50) NOT NULL,
    "successColor" VARCHAR(50) NOT NULL,
    "errorColor" VARCHAR(50) NOT NULL,
    "warnColor" VARCHAR(50) NOT NULL,
    "mutedColor" VARCHAR(50) NOT NULL,
    "mutedForegroundColor" VARCHAR(50) NOT NULL,
    "mutedSecondColor" VARCHAR(50) NOT NULL,
    "chart1Color" VARCHAR(50) NOT NULL,
    "chart2Color" VARCHAR(50) NOT NULL,
    "chart3Color" VARCHAR(50) NOT NULL,
    "chart4Color" VARCHAR(50) NOT NULL,
    "chart5Color" VARCHAR(50) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("theme_id")
);

-- CreateTable
CREATE TABLE "Hyperlink" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(5000) NOT NULL,
    "link" VARCHAR(5000) NOT NULL,
    "text_line_id" INTEGER,
    "paragraph_id" INTEGER,

    CONSTRAINT "Hyperlink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "id_spotify" INTEGER,
    "id_deezer" INTEGER,
    "id_applemusic" INTEGER,
    "id_title" INTEGER NOT NULL,
    "id_cover" INTEGER NOT NULL,
    "on_page_id" INTEGER,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "_date" TIMESTAMP(3) NOT NULL,
    "title" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_page" (
    "id" INTEGER NOT NULL,
    "id_caroussel" INTEGER NOT NULL,
    "id_actuality_title" INTEGER NOT NULL,
    "id_paragraph" INTEGER NOT NULL,
    "id_banner" INTEGER NOT NULL,
    "id_subtitle" INTEGER NOT NULL,
    "id_title" INTEGER NOT NULL,
    "id_pres_img" INTEGER NOT NULL,

    CONSTRAINT "home_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connexion_page" (
    "id" INTEGER NOT NULL,
    "id_title" INTEGER NOT NULL,

    CONSTRAINT "connexion_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias_page" (
    "id" INTEGER NOT NULL,
    "id_pictures_title" INTEGER NOT NULL,
    "id_video_title" INTEGER NOT NULL,
    "id_title" INTEGER NOT NULL,

    CONSTRAINT "medias_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "son_page" (
    "id" INTEGER NOT NULL,
    "id_title" INTEGER NOT NULL,

    CONSTRAINT "son_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_page" (
    "id" INTEGER NOT NULL,
    "id_subtitle" INTEGER NOT NULL,
    "id_paragraph" INTEGER NOT NULL,
    "id_title" INTEGER NOT NULL,

    CONSTRAINT "contact_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dates_page" (
    "id" INTEGER NOT NULL,
    "id_next_title" INTEGER NOT NULL,
    "id_prev_title" INTEGER NOT NULL,
    "id_title" INTEGER NOT NULL,

    CONSTRAINT "dates_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_page" (
    "id" INTEGER NOT NULL,
    "id_image" INTEGER NOT NULL,
    "id_title" INTEGER NOT NULL,

    CONSTRAINT "group_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_includes_image" (
    "image_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "post_includes_image_pkey" PRIMARY KEY ("image_id","post_id")
);

-- CreateTable
CREATE TABLE "post_includes_video" (
    "video_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "post_includes_video_pkey" PRIMARY KEY ("video_id","post_id")
);

-- CreateTable
CREATE TABLE "group_includes_paragraph" (
    "id_paragraph" INTEGER NOT NULL,
    "position_" INTEGER NOT NULL,
    "event_id" INTEGER,
    "album_id" INTEGER,
    "post_id" INTEGER,
    "trombinoscope_item_id" INTEGER,
    "group_page_first_id" INTEGER,
    "group_page_second_id" INTEGER,
    "date_id" INTEGER,

    CONSTRAINT "group_includes_paragraph_pkey" PRIMARY KEY ("id_paragraph","position_")
);

-- CreateTable
CREATE TABLE "caroussel_includes_image" (
    "caroussel_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "caroussel_includes_image_pkey" PRIMARY KEY ("caroussel_id","image_id")
);

-- CreateTable
CREATE TABLE "caroussel_includes_video" (
    "caroussel_id" INTEGER NOT NULL,
    "video_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "caroussel_includes_video_pkey" PRIMARY KEY ("caroussel_id","video_id")
);

-- CreateTable
CREATE TABLE "_FloatingWindowToMediasPage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FloatingWindowToMediasPage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_HomePageToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_HomePageToPost_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MediasPageToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MediasPageToVideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ContactPageToFile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContactPageToFile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_source_key" ON "Image"("source");

-- CreateIndex
CREATE INDEX "_FloatingWindowToMediasPage_B_index" ON "_FloatingWindowToMediasPage"("B");

-- CreateIndex
CREATE INDEX "_HomePageToPost_B_index" ON "_HomePageToPost"("B");

-- CreateIndex
CREATE INDEX "_MediasPageToVideo_B_index" ON "_MediasPageToVideo"("B");

-- CreateIndex
CREATE INDEX "_ContactPageToFile_B_index" ON "_ContactPageToFile"("B");

-- AddForeignKey
ALTER TABLE "DateEvent" ADD CONSTRAINT "DateEvent_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateEvent" ADD CONSTRAINT "DateEvent_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateEvent" ADD CONSTRAINT "DateEvent_date_page_id_fkey" FOREIGN KEY ("date_page_id") REFERENCES "dates_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateEvent" ADD CONSTRAINT "DateEvent_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateEvent" ADD CONSTRAINT "DateEvent_adress_id_fkey" FOREIGN KEY ("adress_id") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "floating_window" ADD CONSTRAINT "floating_window_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "floating_window" ADD CONSTRAINT "floating_window_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trombinoscope_item" ADD CONSTRAINT "trombinoscope_item_text_line_id_fkey" FOREIGN KEY ("text_line_id") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trombinoscope_item" ADD CONSTRAINT "trombinoscope_item_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trombinoscope_item" ADD CONSTRAINT "trombinoscope_item_group_page_id_fkey" FOREIGN KEY ("group_page_id") REFERENCES "group_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hyperlink" ADD CONSTRAINT "Hyperlink_text_line_id_fkey" FOREIGN KEY ("text_line_id") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hyperlink" ADD CONSTRAINT "Hyperlink_paragraph_id_fkey" FOREIGN KEY ("paragraph_id") REFERENCES "Paragraph"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_id_title_fkey" FOREIGN KEY ("id_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_id_cover_fkey" FOREIGN KEY ("id_cover") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_id_spotify_fkey" FOREIGN KEY ("id_spotify") REFERENCES "AlbumLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_id_deezer_fkey" FOREIGN KEY ("id_deezer") REFERENCES "AlbumLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_id_applemusic_fkey" FOREIGN KEY ("id_applemusic") REFERENCES "AlbumLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_on_page_id_fkey" FOREIGN KEY ("on_page_id") REFERENCES "son_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_title_fkey" FOREIGN KEY ("title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_page" ADD CONSTRAINT "home_page_id_caroussel_fkey" FOREIGN KEY ("id_caroussel") REFERENCES "caroussel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_page" ADD CONSTRAINT "home_page_id_actuality_title_fkey" FOREIGN KEY ("id_actuality_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_page" ADD CONSTRAINT "home_page_id_paragraph_fkey" FOREIGN KEY ("id_paragraph") REFERENCES "Paragraph"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_page" ADD CONSTRAINT "home_page_id_banner_fkey" FOREIGN KEY ("id_banner") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_page" ADD CONSTRAINT "home_page_id_pres_img_fkey" FOREIGN KEY ("id_pres_img") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_page" ADD CONSTRAINT "home_page_id_subtitle_fkey" FOREIGN KEY ("id_subtitle") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "home_page" ADD CONSTRAINT "home_page_id_title_fkey" FOREIGN KEY ("id_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connexion_page" ADD CONSTRAINT "connexion_page_id_title_fkey" FOREIGN KEY ("id_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias_page" ADD CONSTRAINT "medias_page_id_pictures_title_fkey" FOREIGN KEY ("id_pictures_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias_page" ADD CONSTRAINT "medias_page_id_video_title_fkey" FOREIGN KEY ("id_video_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias_page" ADD CONSTRAINT "medias_page_id_title_fkey" FOREIGN KEY ("id_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "son_page" ADD CONSTRAINT "son_page_id_title_fkey" FOREIGN KEY ("id_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_id_subtitle_fkey" FOREIGN KEY ("id_subtitle") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_id_paragraph_fkey" FOREIGN KEY ("id_paragraph") REFERENCES "Paragraph"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_id_title_fkey" FOREIGN KEY ("id_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dates_page" ADD CONSTRAINT "dates_page_id_next_title_fkey" FOREIGN KEY ("id_next_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dates_page" ADD CONSTRAINT "dates_page_id_prev_title_fkey" FOREIGN KEY ("id_prev_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dates_page" ADD CONSTRAINT "dates_page_id_title_fkey" FOREIGN KEY ("id_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_page" ADD CONSTRAINT "group_page_id_image_fkey" FOREIGN KEY ("id_image") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_page" ADD CONSTRAINT "group_page_id_title_fkey" FOREIGN KEY ("id_title") REFERENCES "text_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_includes_image" ADD CONSTRAINT "post_includes_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_includes_image" ADD CONSTRAINT "post_includes_image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_includes_video" ADD CONSTRAINT "post_includes_video_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_includes_video" ADD CONSTRAINT "post_includes_video_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_includes_paragraph" ADD CONSTRAINT "group_includes_paragraph_id_paragraph_fkey" FOREIGN KEY ("id_paragraph") REFERENCES "Paragraph"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_includes_paragraph" ADD CONSTRAINT "group_includes_paragraph_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_includes_paragraph" ADD CONSTRAINT "group_includes_paragraph_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_includes_paragraph" ADD CONSTRAINT "group_includes_paragraph_trombinoscope_item_id_fkey" FOREIGN KEY ("trombinoscope_item_id") REFERENCES "trombinoscope_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_includes_paragraph" ADD CONSTRAINT "group_includes_paragraph_group_page_first_id_fkey" FOREIGN KEY ("group_page_first_id") REFERENCES "group_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_includes_paragraph" ADD CONSTRAINT "group_includes_paragraph_group_page_second_id_fkey" FOREIGN KEY ("group_page_second_id") REFERENCES "group_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_includes_paragraph" ADD CONSTRAINT "group_includes_paragraph_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "DateEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caroussel_includes_image" ADD CONSTRAINT "caroussel_includes_image_caroussel_id_fkey" FOREIGN KEY ("caroussel_id") REFERENCES "caroussel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caroussel_includes_image" ADD CONSTRAINT "caroussel_includes_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caroussel_includes_video" ADD CONSTRAINT "caroussel_includes_video_caroussel_id_fkey" FOREIGN KEY ("caroussel_id") REFERENCES "caroussel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caroussel_includes_video" ADD CONSTRAINT "caroussel_includes_video_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FloatingWindowToMediasPage" ADD CONSTRAINT "_FloatingWindowToMediasPage_A_fkey" FOREIGN KEY ("A") REFERENCES "floating_window"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FloatingWindowToMediasPage" ADD CONSTRAINT "_FloatingWindowToMediasPage_B_fkey" FOREIGN KEY ("B") REFERENCES "medias_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HomePageToPost" ADD CONSTRAINT "_HomePageToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "home_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HomePageToPost" ADD CONSTRAINT "_HomePageToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediasPageToVideo" ADD CONSTRAINT "_MediasPageToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "medias_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediasPageToVideo" ADD CONSTRAINT "_MediasPageToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactPageToFile" ADD CONSTRAINT "_ContactPageToFile_A_fkey" FOREIGN KEY ("A") REFERENCES "contact_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactPageToFile" ADD CONSTRAINT "_ContactPageToFile_B_fkey" FOREIGN KEY ("B") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
