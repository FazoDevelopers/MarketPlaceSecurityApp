import zipfile
import os
import shutil


def unzip_and_delete(zip_path, destination="."):
    # Check if the provided path is a valid zip file
    if zipfile.is_zipfile(zip_path):
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            # Extract all the contents of the zip file
            zip_ref.extractall(destination)

            # Get a list of the names of all files and directories in the zip file
            zip_names = zip_ref.namelist()

            # Filter out only directories from the list
            directories = [name for name in zip_names if name.endswith("/")]

            for directory in directories:
                # Create the source path (where the directory was extracted to)
                source = os.path.join(destination, directory)

                # Create the target path (where we want to move the directory to)
                target = os.path.join(
                    destination, os.path.basename(directory.rstrip("/"))
                )

                # Move the directory to the target location
                shutil.move(source, target)

        # Delete the original zip file
        os.remove(zip_path)
    else:
        print(f"'{zip_path}' is not a valid zip file.")


# Example usage:
unzip_and_delete('/home/ocean/Projects/MarketSecurityApp/ai/r.zip', '/home/ocean/Projects/MarketSecurityApp/ai/new')
