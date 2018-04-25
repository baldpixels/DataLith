export class Tool {
  constructor(
    public id: number,
    public name: string,
    public details = 'inactive',
    public image = 'inactive') { }

    toggleDetails() {
      if (this.details = 'inactive') {
        this.details = 'active';
      } else {
        this.details = 'inactive';
      }
    }
    hideDetails() {
      this.details = 'inactive';
    }

    toggleImage() {
      if (this.image = 'inactive') {
        this.image = 'active';
      } else {
        this.image = 'inactive';
      }
    }
    unsetImage() {
      this.image = 'inactive';
    }
}
