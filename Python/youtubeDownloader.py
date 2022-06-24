from pytube import YouTube


def download_360p_mp4_videos(url: str, outpath: str = "./"):

    yt = YouTube(url)

    yt.streams.filter(file_extension="mp4").get_by_resolution("360p").download(outpath)


if __name__ == "__main__":

    download_360p_mp4_videos(
        "https://www.youtube.com/watch?v=JfVOs4VSpmA&t=4s&ab_channel=SonyPicturesEntertainment",
        "./trailers",
    )