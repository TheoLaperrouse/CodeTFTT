from math import ceil
from itertools import islice
from instaloader import Instaloader, Profile


def get_images_from_profile_name(profile_name, percentage):
    insta_bot = Instaloader()
    profile = Profile.from_username(insta_bot.context, profile_name)
    posts_sorted_by_likes = sorted(
        profile.get_posts(), key=lambda post: post.likes, reverse=True)
    for post in islice(posts_sorted_by_likes, ceil(profile.mediacount * percentage / 100)):
        insta_bot.download_post(post, profile_name)


if __name__ == "__main__":
    input_name = input("Renseigner le nom de l'utilisateur : ")
    PERCENTAGE = 100    # percentage of posts that should be downloaded
    get_images_from_profile_name(input_name, PERCENTAGE)
