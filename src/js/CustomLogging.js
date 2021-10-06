class CustomLogging {
    constructor(title) {
        this.body = {
            color: '#bb4646',
            size: '0.8rem',
        };
    }

    // setTitleStyle({ color, size }) {
    //     if (color !== undefined) this.title.color = color;
    //     if (size !== undefined) this.title.size = size;
    // }

    // setBodyStyle({ color, size }) {
    //     if (color !== undefined) this.body.color = color;
    //     if (size !== undefined) this.body.size = size;
    // }

    log(body = '') {
        // the second line is now the body because the first references the content after the first %c for the title
        console.log(
            `%c${body}`,
            `color: ${this.body.color}; font-weight: bold; font-size: ${this.body.size};`
        );
    }
}

export default CustomLogging;
