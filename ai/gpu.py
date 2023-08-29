import torch
import time


# Check if CUDA (GPU support) is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Dummy model and data
model = torch.nn.Linear(10, 10).to(device)
data = torch.randn(5, 10).to(device)

ss = ""
while True:
    # Assume that the model and data are already on the GPU
    output = model(data)
    ss += str(output)
    # time.sleep(1)