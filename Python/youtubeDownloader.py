from pytube import YouTube


def download_videos(url: str, outpath: str = "./"):
    yt = YouTube(url)
    print('Le téléchargement de la vidéo a commencé...')
    yt.streams.filter(file_extension="mp4").get_by_resolution(
        "720p").download(outpath)
    print(
        f'Le téléchargement de la vidéo est fini, vous pouvez la retrouver dans le dossier {outpath}')

if __name__ == "__main__":
    url = input("Renseigner l'url de la vidéo à télécharger : ")
    download_videos(
        url,
        "./youtubeVideos",
    )
