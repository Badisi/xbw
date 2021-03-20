export function verifyWithAbgx360(isoPaths: string[], options?: AbgxOptions, onProgress?: (progress: string) => void): Promise<AbgxFile[]>;
export function getIsosInfo(isoPaths: string[]): IsoInfo[];
export enum Region {
    REGION_FREE = 'REGION_FREE',
    OTHER = 'OTHER',
    OTHER_UNKNOWN = 'OTHER_UNKNOWN',
    PAL = 'PAL',
    PAL_EXCLUDE_AUS_NZ = 'PAL_EXCLUDE_AUS_NZ',
    PAL_ONLY_AUS_NZ = 'PAL_ONLY_AUS_NZ',
    PAL_UNKNOWN = 'PAL_UNKNOWN',
    NTSC_J = 'NTSC_J',
    NTSC_J_EXCLUDE_CHINA = 'NTSC_J_EXCLUDE_CHINA',
    NTSC_J_EXCLUDE_JAPAN = 'NTSC_J_EXCLUDE_JAPAN',
    NTSC_J_EXCLUDE_JAPAN_CHINA = 'NTSC_J_EXCLUDE_JAPAN_CHINA',
    NTSC_J_ONLY_JAPAN = 'NTSC_J_ONLY_JAPAN',
    NTSC_J_ONLY_CHINA = 'NTSC_J_ONLY_CHINA',
    NTSC_J_ONLY_JAPAN_CHINA = 'NTSC_J_ONLY_JAPAN_CHINA',
    NTSC_J_UNKNOWN = 'NTSC_J_UNKNOWN',
    NTSC_U = 'NTSC_U',
    NTSCU_UNKNOW = 'NTSCU_UNKNOWN'
}
export enum AbgxStatus {
    VERIFIED = 0,
    ERROR = -1,
    DATA_ERROR = -2,
    STEALTH_ERROR = -3
}
export interface AbgxFile {
    file: string;
    status: AbgxStatus;
}
export interface AbgxOptions {
    corrupt: boolean;
    verbose: boolean;
    noverbose: boolean;
    help: boolean;
    terminal: boolean;
    stripcolors: boolean;
    html: boolean;

    noheader: boolean;
    justheader: boolean;
    justfooter: boolean;
    minimal: boolean;
    script: boolean;

    nodvdcheck: boolean;
    noautofix: boolean;
    af0: boolean;
    autofixfailed: boolean;
    af1: boolean;
    autofixalways: boolean;
    af3: boolean;
    noverify: boolean;
    autoupload: boolean;
    noupdate: boolean;
    csv: boolean;
    stayoffline: boolean;
    regioncheck: boolean;
    nogamecrc: boolean;
    gamecrc: boolean;

    p_video: string;
    p_pfi: string;
    p_dmi: string;
    p_ss: string;
    e_video: string;
    e_pfi: string;
    e_dmi: string;
    e_ss: string;

    patchgarbage: boolean;
    patchitanyway: boolean;
    debug: boolean;
    debugfs: boolean;
    rebuildlowspace: boolean;
    keeporiginaliso: boolean;
    norebuild: boolean;
    truncate: string;
    pause: boolean;
    max: boolean;
    padding: boolean;
    pL0: boolean;
    showfiles: boolean;
    nofixdev: boolean;
    fixangle359: boolean;
    folder: string;
    dir: string;
    match: string;
    showsstable: boolean;
    showfulltable: boolean;
    nofixdrt: boolean;
    testing: boolean;
    testingdvd: boolean;
    nowrite: boolean;
    user: string;
    pass: string;
    localonly: boolean;
    makedat: boolean;
    dontparsefs: boolean;
    sizedoesntmatter: boolean;

    rec: boolean;
    clobber: boolean;
    ach: boolean;
    achs: boolean;
    aa: boolean;
    images: boolean;
    embed: boolean;
    skiplb: boolean;
    devkey: boolean;
    notrust: boolean;
    useinstalldir: boolean;
    orig: string;
    dvd: string;

    myregion: string;
    rgn: string;

    nettimeout: number;
    dvdtimeout: number;
    dev: number;
    retries: number;
    lang: number;
    speed: number;
}
export interface IsoInfo {
    file: string;
    titleId: string;
    mediaId: string;
    discCount: number;
    discNumber: number;
    regions: Region[];
    isValid: boolean;
}
