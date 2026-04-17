export type CompanyAboutMilestone = {
    year: string;
    text: string;
};

export type CompanyAboutTeamMember = {
    name: string;
    role: string;
    note: string;
};

export type CompanyAboutContent = {
    intro: string;
    milestonesTitle: string;
    milestones: CompanyAboutMilestone[];
    teamTitle: string;
    team: CompanyAboutTeamMember[];
    licensesNote: string;
};

export type CompanyAboutSectionsProps = {
    content: CompanyAboutContent;
};
