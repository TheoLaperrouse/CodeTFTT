from pytube import YouTube


def download_videos(url: str, outpath: str = "./"):
    youtube = YouTube(url)
    print('Le téléchargement de la vidéo a commencé...')
    youtube.streams.filter(file_extension="mp4").get_by_resolution(
        "360p").download(outpath)
    print(
        'Le téléchargement de la vidéo est fini,'\
        f'vous pouvez la retrouver dans le dossier {outpath}'
    )

if __name__ == "__main__":
    input_url = input("Renseigner l'url de la vidéo à télécharger : ")
    download_videos(
        input_url,
        "./youtubeVideos",
    )
