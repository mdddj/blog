

export function showDialogModal(id: string): void {
    let ds = document.getElementById(id);
    if (ds !== null) {
        (ds as HTMLDialogElement).showModal();
    }
}

export function closeDialogModal(id: string): void {
    let ds = document.getElementById(id);
    if (ds !== null) {
        (ds as HTMLDialogElement).close();
    }
}