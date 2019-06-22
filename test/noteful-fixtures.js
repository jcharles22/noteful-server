function makeFoldersArray() {
    return [
      {
        id: 1,
        name: "FolderOne"
      },
      {
        id: 2,
        name: "FolderTwo"
      },
      {
        id: 3,
        name: "FolderThree"
      }
    ];
  }
  
  function makeNotesArray() {
    return [
      {
        id: 1,
        modified: "2019-01-03T00:00:00.000Z",
        folderId: 1,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?"
      },
      {
        id: 2,
        modified: "2019-01-03T00:00:00.000Z",
        folderId: 2,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?"
      },
      {
        id: 3,
        modified: "2019-01-03T00:00:00.000Z",
        folderId: 3,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?"
      }
    ];
  }
  
  function makeMaliciousFolder() {
    const maliciousFolder = {
      id: 911,
      name: 'Naughty naughty very naughty <script>alert("xss");</script>'
    };
    const expectedFolder = {
      ...maliciousFolder,
      name:
        'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;'
    };
    return {
      maliciousFolder,
      expectedFolder
    };
  }
  
  function makeMaliciousNote() {
    const maliciousNote = {
      id: 911,
      modified: new Date().toISOString(),
      folderId: 911,
      name: 'Naughty naughty very naughty <script>alert("xss");</script>',
      content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
    };
    const expectedNote = {
      ...maliciousNote,
      name:
        'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
      content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    };
  }
  
  module.exports = {
    makeFoldersArray,
    makeNotesArray,
    makeMaliciousFolder,
    makeMaliciousNote
  };