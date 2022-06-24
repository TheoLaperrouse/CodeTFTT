echo Renseigner le nom du profil :
read profile_name
instaloader profile $profile_name --dirname-pattern=instaPosts/$profile_name --no-captions --no-metadata-json