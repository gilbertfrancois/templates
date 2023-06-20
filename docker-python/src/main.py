import requests

if __name__ == "__main__":
    print("Status code:")
    res = requests.get("https://www.google.com")
    print(res.status_code)
    exit(0)
    
