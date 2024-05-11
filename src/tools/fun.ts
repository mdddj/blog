

export function showDialogModal(id: string): void {
    let ds = document.getElementById(id);
    if (ds !== null) {
        (ds as HTMLDialogElement).showModal();
    }
}