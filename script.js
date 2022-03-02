const addButton = document.querySelector("#add");

const updateLsData=()=>{

    const textData = document.querySelectorAll('textarea');
    // ye object  ki form me save hora hai (key: value) because of queryselctor

    const notes = [];
    textData.forEach((data)=>{

          return notes.push(data.value)
    })

    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `
      <div class="operation">
          <button class="edit"> <i class="fas fa-edit"></i> </button>
          <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
      </div>
  
      <div class="main ${text ? "" : "hidden"} "> </div>
      <textarea class="${text ? "hidden" : ""}"></textarea>  `;

    note.insertAdjacentHTML("afterbegin", htmlData);
    // console.log(note);

    document.body.appendChild(note)

    //getting the reference

    const editButton = note.querySelector(".edit");
    const delButton = note.querySelector(".delete");
    
    const mainDiv = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    //deleting the node

    delButton.addEventListener("click",()=>{

        note.remove();
        updateLsData();
    })

    //toggling using edit button


    textArea.value = text;
    mainDiv.innerHTML = text

    editButton.addEventListener("click",()=>{

        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change',(event)=>{

        const value = event.target.value;

        mainDiv.innerHTML = value;

        updateLsData();
 


    })

}


//getting data from local storage
//aab jo data milega parse krna padega

const no = JSON.parse(localStorage.getItem('notes'));

if(no)
{
    no.forEach((note)=> addNewNote(note))
}

addButton.addEventListener("click", () => addNewNote())