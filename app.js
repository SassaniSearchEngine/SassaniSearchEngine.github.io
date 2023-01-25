const content = document.getElementById("content");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  let input = document.getElementById("input").value;

  if (input !== "") {
    // Use the Fetch API to get the list of files in the folder directory
    fetch(`/Transcripts/Sassani/Elan/${input}`)
      .then(response => {
        console.log(`Fetching files in ${input} directory`);
        if (response.ok) {
          return response.text();
        }
        throw new Error(response.statusText);
      })
      .then(files => {
        console.log(`Found files: ${files}`);
        // Parse the files string into an array
        const fileArray = files.split("\n");
        // Filter the array of files to only keep the .txt files
        const txtFiles = fileArray.filter(file => file.endsWith('.txt'));
        console.log(`Found txt files: ${txtFiles}`);
        // Iterate over the array of txt files
        txtFiles.forEach(file => {
          // Use the Fetch API to read the contents of each file
          fetch(`/Transcripts/Sassani/Elan/${input}/${file}`)
            .then(response => {
              if (response.ok) {
                console.log(`Fetching ${file}`);
                return response.text();
              }
              throw new Error(response.statusText);
            })
            .then(fileContent => {
              console.log(`Successfully fetched ${file}`);
              // Create a new element to display the file content
              let fileContainer = document.createElement("div");
              fileContainer.innerHTML = fileContent;
              content.appendChild(fileContainer);
            })
            .catch(error => console.error(error));
        });
      })
      .catch(error => console.error(error));
  }
});
