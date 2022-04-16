/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Question Model - question.model.ts
*/

export class Question
{

    constructor(
        public _id?: number,
        public title?: string,
        public choice1?: string,
        public choice2?: string,
        public choice3?: string,
        public choice4?: string
        
    ){}

    clear(): void
    {
        this._id = null;
        this.title = null;
        this.choice1 = this.choice2 = this.choice3 = this.choice4 = null;    
        
    }

    public toString(): string
    {
        return `Question
        -------------------------
        Title        : ${this.title}
        Choice 1     : ${this.choice1}
        Choice 2     : ${this.choice2}
        Choice 3     : ${this.choice3}
        Choice 4     : ${this.choice4}
        -------------------------
        `;
    }
}