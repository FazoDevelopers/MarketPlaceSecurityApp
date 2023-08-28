import os
import zipfile
import shutil
from tqdm import tqdm

def move_files_from_zip_one_by_one(zip_file_path, dest_root):
    """
    Move files from a ZIP archive to dest_root one by one, preserving directory structure.
    """
    with zipfile.ZipFile(zip_file_path, 'r') as z:
        # Wrap z.namelist() with tqdm for progress bar
        for name in tqdm(z.namelist(), desc="Processing files", unit="file"):
            # Create directory if it ends with '/'
            if name.endswith('/'):
                full_dest_dir = os.path.join(dest_root, name)
                os.makedirs(full_dest_dir, exist_ok=True)
            else:
                src_path = z.extract(name, "/tmp/extracted_files")
                dest_path = os.path.join(dest_root, name)
                dest_folder = os.path.dirname(dest_path)
                
                os.makedirs(dest_folder, exist_ok=True)
                shutil.move(src_path, dest_path)  # This will automatically remove the src_path file

if __name__ == "__main__":
    source_zip = "/home/ocean/Projects/MarketSecurityApp/ai/some.zip"
    destination_directory = "/home/ocean/Games/"

    move_files_from_zip_one_by_one(source_zip, destination_directory)
