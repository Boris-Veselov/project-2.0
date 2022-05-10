var granimInstance = new Granim({
    //selects gradient element
    element: '#Granim',
    //type of gradient
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            //gradient colors
            gradients: [
                ['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053']
            ]
        }
    }
});