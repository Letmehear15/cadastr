////// URL 
const parsedUrl = new URL(window.location.href);
const pathname = parsedUrl.pathname.split("/").pop().slice(0, -5);
const breadCrumbs = document.querySelector(".insertByJs")
const urlMAP = {
    'services': '.servicesCompany',
    'contacts': '.contactsCompany'
};

const menuElement = document.querySelector(urlMAP[pathname])

menuElement?menuElement.style.color = "#7DBCAF":null

if(breadCrumbs) {
    document.querySelector(urlMAP['services']).style.color = "#7DBCAF"
}
