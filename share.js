window.Share = (function () {
    'use strict';

    var instance = null;

    function Share () {
        this.height = 500;
        this.width = 700;
    }

    Share.prototype.init = init;
    /**
     * Init
     *
     * @returns {object} Instance object
     */
    function init () {
        const elements = this.getElements();
        Array.prototype.forEach.call(elements, setup.bind(this));
        return this;
    }

    Share.prototype.getElements = getElements;
    /**
     * Get Elements
     *
     * @returns {object} Element's List
     */
    function getElements () {
        return document.querySelectorAll('.js-share');
    }

    Share.prototype.getInstance = getInstance;
    /**
     * Get Instance
     *
     * @returns {object} Share instance object
     */
    function getInstance () {
        if (!instance) instance = new Share();
        return instance;
    }

    /*-----------------------------------------------------------------------*\
                                    Private Stuff
    \*-----------------------------------------------------------------------*/

    /**
     * Setup
     *
     *
     * @param {object} element Share's element
     * @returns void
     */
    function setup (element) {
        if (element.classList.contains('js-share-initialized')) return;
        element.classList.add('js-share-initialized');
        element.addEventListener('click', clickHandler.bind(this));
    }

    /**
     * Click Handler
     * 
     * @param {object} event Event's object
     * @returns void
     */
    function clickHandler (event) {
        const { shareName, shareTitle, shareUrl } = event.target.dataset;
        
        window.open(
            getUrl(shareName, shareTitle, shareUrl), 
            shareName, 
            getPopupConfig.call(this)
        );

        event.preventDefault();
    }

    /**
     * Get Popup Config
     * 
     * @returns {string}
     */
    function getPopupConfig () {
        const { width, height } = this;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        return `width=${width},height=${height},left=${left},top=${top}`;
    }

    /**
     * Get URL
     * 
     * @returns {string}
     */
    function getUrl (name, title, url) {
        url = window.encodeURIComponent(url);

        switch (name) {
            case 'facebook':
                return `https://www.facebook.com/sharer.php?u=${url}`;
            case 'telegram':
                return `https://telegram.me/share/url?url=${url}&text=${title}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            case 'whatsapp':
                return `https://api.whatsapp.com/send?text=${title}%20${url}`;
        }
    }

    /**
     * Return instance
     */
    return Share.prototype.getInstance();
})();
