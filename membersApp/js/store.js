(() => {
    const apiUrl = './sql/';
    // showSpinner();

    $('.main .store-container .row').append(
            `<div class="header-block header-block--wider">
				<div class="header-block__container">
					<h3 class="header-block__title">Store</h3>
				</div>
			</div>
			<br />
			
			`
        );
    $('.main .store-container .row').append(generateCollapse());
    async function getData(url) {
        try {
            const res = await fetch(url);
            return await res.json();
        } catch (err) {

            console.error(err);
        }
    }

    // Spinner
    function showSpinner() {
        $('.main').append('<div class="loader"></div>');
    }

    function hideSpinner() {
        $('div.loader').hide();
    }

    function generateCollapse() {
        return `
				<div class="card-group">
    <div class="card">
        <img src="https://i.ontraport.com/183266.1c57908521b02820de39700f0925fb9a.JPEG" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">Take Your Pet Around Town with the "Official ESA™ Vest"</h5>
            </div>
            <div class="card-footer">
                <a href="https://www.supportpets.com/vest-1-sale-existing-customers/" class="esa-link" target="_blank">
            </div>
    </div>
    <div class="card">
        <img src="https://i.ontraport.com/183266.e88aab04082f0931a48c82bfe93a64b7.PNG?ops=1920"
             class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">Take Your Pet Around Town With The "Official ESA ID Card"</h5>
            </div>
            <div class="card-footer">
                <a href="https://www.supportpets.com/clearance-sale-esa-id-cards-with-free-esa-tag/" class="esa-link" target="_blank">
            </div>
    </div>
    <div class="card">
        <img src="https://i.ontraport.com/183266.13ad02c0ada784e5ce1d3b03ef66d8e2.PNG?ops=640" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">Official Deluxe™ Renewal Kit</h5>
            </div>
            <div class="card-footer">
                <a href="https://www.supportpets.com/esa-renewal-deluxe/" class="esa-link" target="_blank">
            </div>
    </div>
</div>
		`;
    }


})()