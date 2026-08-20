// --- Export Contacts to TXT File ---
export const exportContactsToFile = (contacts, triggerToast) => {
    const fileContent = contacts.map(c =>
        `Name: ${c.firstName} ${c.lastName} | Title: ${c.title} | Email: ${c.emails[0]?.address || 'N/A'} | Phone: ${c.phones[0]?.number || 'N/A'}`
    ).join('\n');

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8;' });
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = URL.createObjectURL(blob);
    downloadAnchor.setAttribute("download", "contacts_export.txt");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Contacts downloaded successfully.');
};

// --- Import Contacts from TXT File (With Duplicate Prevention) ---
export const importContactsFromFile = (e, setContacts, triggerToast) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (event) => {
            try {
                const textData = event.target.result;
                const lines = textData.split('\n');
                const parsedContacts = [];

                lines.forEach((line, index) => {
                    if (line.trim() !== '') {
                        const parts = line.split('|');
                        if (parts.length >= 4) {
                            const namePart = parts[0].replace('Name:', '').trim().split(' ');
                            const titlePart = parts[1].replace('Title:', '').trim();
                            const emailPart = parts[2].replace('Email:', '').trim();
                            const phonePart = parts[3].replace('Phone:', '').trim();

                            parsedContacts.push({
                                id: Date.now() + index,
                                firstName: namePart[0] || 'Unknown',
                                lastName: namePart.slice(1).join(' ') || '',
                                title: titlePart,
                                emails: [{ type: 'Work', address: emailPart }],
                                phones: [{ type: 'Mobile', number: phonePart }]
                            });
                        }
                    }
                });

                if (parsedContacts.length > 0) {
                    setContacts(prevContacts => {
                        const existingEmails = new Set(
                            prevContacts.map(c => c.emails[0]?.address?.toLowerCase())
                        );

                        const uniqueNewContacts = parsedContacts.filter(c => {
                            const email = c.emails[0]?.address?.toLowerCase();
                            return email && !existingEmails.has(email);
                        });

                        if (uniqueNewContacts.length === 0) {
                            triggerToast('No new contacts found (all were duplicates).');
                            return prevContacts;
                        }

                        triggerToast(`Successfully uploaded ${uniqueNewContacts.length} new contact(s).`);
                        return [...prevContacts, ...uniqueNewContacts];
                    });
                } else {
                    triggerToast('No valid contact lines found in file.');
                }
            } catch (error) {
                triggerToast('Error reading uploaded text file.');
            }
        };
    }
    e.target.value = '';
};