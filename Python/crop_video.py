from pathlib import Path
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip


if __name__ == '__main__':
    path = input(
        "Quelle est le nom du fichier (avec extension)"\
            "(exemple : youtubeVideos/video.mp4 ou video.mp4) : ")
    name_file = path.split('/')[-1]
    start_time = int(input("Début de l'extrait (en seconde) : "))
    end_time = int(input("Fin de l'extrait (en seconde) : "))

    # Create a folder videoClip if there isn't
    Path("videoClip").mkdir(exist_ok=True)

    ffmpeg_extract_subclip(path, start_time, end_time,
                        targetname=f"videoClip/{name_file}")
    print(f"Clip vidéo disponible ici : videoClip/{name_file}")
