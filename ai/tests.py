# import os
# import hashlib
# import time


# class SimpleBcrypt:
#     def __init__(self, work_factor=100000):
#         self.work_factor = work_factor

#     def _hash(self, password, salt):
#         # A very basic iterative hashing to simulate work factor.
#         # This is where bcrypt does things differently with Blowfish-based algo.
#         hash_val = password + salt
#         for _ in range(self.work_factor):
#             hash_val = hashlib.sha256(hash_val).digest()
#         return hash_val

#     def generate_salt(self):
#         return os.urandom(16)

#     def hashpw(self, password, salt):
#         password = password.encode("utf-8")
#         return self._hash(password, salt)

#     def checkpw(self, password, hashed, salt):
#         password = password.encode("utf-8")
#         return self._hash(password, salt) == hashed


# # Testing the class
# bcrypt = SimpleBcrypt(work_factor=100000)

# password = "my_password"
# salt = bcrypt.generate_salt()

# start = time.time()
# hashed = bcrypt.hashpw(password, salt)
# end = time.time()

# print(f"Hashing time: {end - start} seconds.")
# print(f"Hashed Password: {hashed}")

# # Check password
# check_password = "my_password"
# if bcrypt.checkpw(check_password, hashed, salt):
#     print("Password is correct!")
# else:
#     print("Password is incorrect!")
# letters = [chr(i) for i in list(range(97, 123)) + list(range(65, 91))] 
# underscore = ["_"]
# digits = [str(k) for k in list(range(10))]
# print(digits)