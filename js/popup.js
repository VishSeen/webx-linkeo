////////////////////////////////////////////////////////////////////////////////
// ALGO
// onstart get all items and set ids

// on click extension icon, get current Jira ticket "Add comment link"

// set id on all @category and @item elements for reference

// onclick @btnDone get all @input element
// getValidationStatus and add in @mJiraFullString
// get all @item status and add in @mJiraFullString after "\n"

// copy @mJiraFullString as clipboard

// open new window with @jiraCommentLink

// paste the current clipboard

// SCRIPT DONE


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const btnJiraComment = document.querySelector('#comment_issue');
let jiraCommentLink = "";

let mTitle = "CONTRÔLE QUALITÉ";
var mCategoryId = 0;
var mItemId = 0;

////////////////////////////////////////////////////////////////////////////////
// JIRA COMMENT STRUCTURES
////////////////////////////////////////////////////////////////////////////////

let mJiraFullString = "";

const jiraTitle = "{panel:title=" + mTitle + "| borderStyle=solid| borderColor=#003366| titleBGColor=#3C78B5| bgColor=#EEEEEE}";
const jiraH3 = "h3.";
const jiraH4 = "h4.";
const jiraList = "-"
const jiraChecked = "(/)";
const jiraUnchecked = "(x)";
const jiraCheckHasard = "(!)";
const jiraBold = "*";
const jiraColor = "{color}";

const mJiraCommentValidation = "h3. SITE ";


////////////////////////////////////////////////////////////////////////////////
// CLICK FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
const btnCancel = document.querySelectorAll('#btn-cancel')[0];
btnCancel.onclick = function() {
    window.close();
}

const btnDone = document.querySelectorAll('#btn-done')[0];
btnDone.onclick = function() {
    // validate category items in @mJiraFullString
    validateCategoryItems();

    // copy to clipboard
    copyToClipboard();

    // open comment
    // window.open(jiraCommentLink);
}



////////////////////////////////////////////////////////////////////////////////
// CALLING FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
setId(mCategoryId, mItemId);





////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////
/**
  - loops through all .category, .item, checkboxes, label
  - set ids for getting values
*/
function setId(categoryId, itemId) {
    const categoryBlocks = document.querySelectorAll("div.category");
    categoryBlocks.forEach(category => {
        category.id = "category-" + categoryId;

        const itemBlocks = document.querySelectorAll("#category-" + categoryId + " .item");
        itemBlocks.forEach(item => {
            item.id = "item-" + itemId;

            const inputs = document.querySelectorAll("#category-" + categoryId + " #item-" + itemId + " input[type='checkbox']");
            inputs.forEach(input => {
                input.id = "input-" + itemId;
            });

            const labels = document.querySelectorAll("#category-" + categoryId + " #item-" + itemId + " label");
            labels.forEach(label => {
                label.htmlFor = "input-" + itemId;
            });

            itemId = itemId + 1;
            mItemId = itemId;
        });

        categoryId = categoryId + 1;
        mCategoryId = categoryId;
    });
}


//===================================//
/**
  - add data to json from category divs
*/
function validateCategoryItems() {
    let catLength = document.querySelectorAll(".category").length; // use to create json forms
    let catIte = 0;
    let itemCount = 0;

    mJiraFullString = getValidationStatus();

    // loop through categories
    for (let i = 0; i < catLength; i++) {
        const categoryId = document.getElementById("category-" + i);
        const categoryItemsCount = categoryId.childElementCount - 1; // minus 1 because excluding 'textarea'

        console.log("Cat at : " + i);
        console.log("item start : " + itemCount);

        for (let j = 0; j < categoryItemsCount; j++) {
            const item = document.getElementById("item-" + itemCount);

            if (j === 0) {
                const label = document.querySelector("#item-" + itemCount + " label h4").innerText;
                const input = document.querySelector("#input-" + itemCount);

                if (input.checked) {
                    mJiraFullString = mJiraFullString + "\n" + jiraH4 + " " + label + " " + jiraChecked;
                } else {
                    mJiraFullString = mJiraFullString + "\n" + jiraH4 + " " + label + " " + jiraUnchecked;
                }
            } else {
                const label = document.querySelector("#item-" + itemCount + " label p").innerText;
                const input = document.querySelector("#input-" + itemCount);

                if (input.checked) {
                    mJiraFullString = mJiraFullString + "\n" + jiraList + " " + label + " " + jiraChecked;
                } else {
                    mJiraFullString = mJiraFullString + "\n" + jiraList + " " + label + " " + jiraUnchecked;
                }
            }

            itemCount = itemCount + 1;
        }

        // get @textarea data and add to @mJiraFullString
        const extraComment = document.querySelector("#category-" + i + " textarea");
        console.log(extraComment.value);
        mJiraFullString = mJiraFullString + "\n" + extraComment.value + "\n";

        catIte = catIte + 1;
    }
}



//===================================//
/**
  - get select value to check if validated or not
*/
function getValidationStatus() {
    const selectStatus = document.getElementById('select-status');
    let txtmJiraCommentValidation = "";

    switch (selectStatus.value) {
        case "valide":
            txtmJiraCommentValidation = mJiraCommentValidation + "{color:green}VALIDÉ" + jiraColor + " " + jiraChecked;
            break;
        case "refuse":
            txtmJiraCommentValidation = mJiraCommentValidation + "{color:red}REFUSÉ" + jiraColor + " " + jiraUnchecked;
            break;
        default:
            break;
    }
    return txtmJiraCommentValidation + "\n";
}



//===================================//
/**
  - get the last textarea and add retrieved JSON data.
  - then select the textarea and copy to Clipboard
*/
function copyToClipboard() {
    const txtAreaCopy = document.querySelector("#txtarea-clipboard");

    txtAreaCopy.innerHTML = mJiraFullString; //JSON.stringify(dict);

    txtAreaCopy.select();

    document.execCommand("copy");
}


////////////////////////////////////////////////////////////////////////////////