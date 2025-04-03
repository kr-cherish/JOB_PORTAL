const uploadImagetoPinata = async (file: File): Promise<string | null> => {
  let JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDc4YjMxYS0yYmJlLTQyNjgtYWNlMS00ZDJlZTVhNjVkM2YiLCJlbWFpbCI6ImNoZXJpc2gucEBrbmFja3Jvb3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjNjMzE2MWVlNTc2YmUyZjBiMzgyIiwic2NvcGVkS2V5U2VjcmV0IjoiZTIwOGQzOTJhODJkNTI2MjY3OTZjN2I4NGE3NDEwYTFhZTFlNTM2ZWZiMDZkOTBkNjQwZjRjNzc5NjRiODlkMSIsImV4cCI6MTc3NTIwOTI4MX0.uPcNAMB1bCSEJHFzSIsF_iiv7Gye7_0kXel-5J_k1P0"
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload: ${response.statusText}`);
    }

    const data = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  } catch (error) {
    console.error("Pinata Upload Error:", error);
    return null;
  }
};

export default uploadImagetoPinata;
