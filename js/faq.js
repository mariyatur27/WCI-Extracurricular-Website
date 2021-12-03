async function setupBoxes(boxesSource, divID, countPerRow, filter=null, search=null) {
    if (!dataFetched) {
        await fetchData();
    }

    let boxes = document.getElementById(divID);
    document.getElementById(divID).innerHTML = "";

    let boxCount = 0;

    let row;
    
    boxesSource.forEach((boxData) => {
        if ((filter == null || boxData.categories.includes(filter)) && (search == null || boxData.name.toLowerCase().includes(search))) {

            let box = document.createElement("div"); box.classList.add("question_block");
                let question = document.createElement("div"); box.classList.add("question");
                box.appendChild(question)l;
                    let ques_text = document.createElement("h3"); ques_text.classList.add("ques_txt"); ques_text.innerHTML = boxData.question;
                    question.appendChild(ques_text);
                    let drop_div = document.createElement("div"); drop_div.classList.add("together2");
                            let drop_button = document.createElement("button"); drop_button.classList.add("drop"); drop_button.addEventListener("click", () => {box.classList.toggle("active");});
                                let drop_inner_div = document.createElement("div"); drop_inner_div.classList.add("together2");
                                    let down_arrow = document.createElement("i"); down_arrow.classList.add("fas", "fa-chevron-down", "down");
                                    drop_inner_div.appendChild(down_arrow);
                                    let up_arrow = document.createElement("i"); up_arrow.classList.add("fas", "fa-chevron-up", "up");
                                    drop_inner_div.appendChild(up_arrow);
                                drop_button.appendChild(drop_inner_div);
                            drop_div.appendChild(drop_button);
                        question.appendChild(drop_div);
                    box.appendChild(question);

                let expand_box = document.createElement("div"); expand_box.classList.add("answer");
                    let ans_txt = document.createElement("p"); summary_title.innerText = boxData.answer;
                    expand_box.appendChild(ans_txt);

                box.appendChild(expand_box);

}