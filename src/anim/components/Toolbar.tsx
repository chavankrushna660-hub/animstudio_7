// @ts-nocheck
import React from 'react';
import { 
  MousePointer2, 
  ZoomIn,
  PenTool, 
  Paintbrush, 
  Eraser, 
  Target, 
  Scissors, 
  Pin, 
  Scaling, 
  Wand2, 
  PenLine, 
  PaintBucket, 
  LassoSelect, 
  BoxSelect, 
  Smile,
  Rotate3d, 
  Box, 
  Shapes, 
  Grid3x3, 
  Spline, 
  Anchor, 
  Droplets,
  Hand,
  Move,
  Layers3,
  Lock,
  Route,
  GitFork,
  Workflow,
  Network,
  Disc,
  Activity,
  Pipette,
  Crosshair,
  SlidersHorizontal,
  FolderTree,
  Bone,
  CircleDot,
  RefreshCw,
  Zap,
  Maximize2, 
  Minimize2
} from 'lucide-react';

interface ToolbarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Toolbar({
  activeTool,
  setActiveTool,
  collapsed,
  setCollapsed,
}: ToolbarProps) {
  const tools = [
    { id: 'SEL', shortId: 'SEL', name: 'Select', label: 'Select Tool (SEL)', icon: MousePointer2 },
    { id: 'ZOM', shortId: 'ZOM', name: 'Zoom & Pan', label: 'Zoom Tool (ZOM)', icon: ZoomIn },
    { id: 'PEN', shortId: 'PEN', name: 'Vector Pen', label: 'Vector Pen (PEN)', icon: PenTool },
    { id: 'BRS', shortId: 'BRS', name: 'Brush', label: 'Brush Tool (BRS)', icon: Paintbrush },
    { id: 'ERS', shortId: 'ERS', name: 'Eraser', label: 'Eraser Tool (ERS)', icon: Eraser },
    { id: 'PVT', shortId: 'PVT', name: 'Pivot Center', label: 'Pivot Center Tool (PVT)', icon: Target },
    { id: "KNF", shortId: 'KNF', name: 'Knife Cut', label: 'Knife Tool (KNF)', icon: Scissors },
    { id: "PIN", shortId: 'PIN', name: 'Puppet Pin', label: 'Puppet Warp Pin (PIN)', icon: Pin },
    { id: 'VST', shortId: 'VST', name: 'Transform Box', label: 'Vector Smart Transform (VST)', icon: Scaling },
    { id: 'SCT', shortId: 'SCT', name: 'Smart Correct', label: 'Smart Correct Tool (SCT)', icon: Wand2 },
    { id: 'VLB', shortId: 'VLB', name: 'Vector Line', label: 'Vector Line Brush (VLB)', icon: PenLine },
    { id: 'FIL', shortId: 'FIL', name: 'Fill Bucket', label: 'Paint Bucket Fill (FIL)', icon: PaintBucket },
    { id: 'LSO', shortId: 'LSO', name: 'Lasso Select', label: 'Lasso Area Select (LSO)', icon: LassoSelect },
    { id: 'FSL', shortId: 'FSL', name: 'Box Select', label: 'Box Free Selection (FSL)', icon: BoxSelect },
    { id: 'VEX', shortId: 'VEX', name: 'Part Isolator', label: 'Vector Part Isolator (VEX)', icon: Scissors },
    { id: 'PSE', shortId: 'PSE', name: 'Pose Studio', label: 'Mouth & Eye Pose Studio (PSE)', icon: Smile },
    { id: '360', shortId: '360', name: '360° Studio', label: '360° Pseudo-3D Turnaround (360)', icon: Rotate3d },
    { id: 'WSC', shortId: 'WSC', name: '3D Wire Sculpt', label: '3D Wire Sculpt (WSC)', icon: Box },
    { id: 'SHP', shortId: 'SHP', name: 'Shapes', label: 'Geometric Shapes Tool (SHP)', icon: Shapes },
    { id: 'MSH', shortId: 'MSH', name: 'Mesh Wrap', label: 'Geometry Mesh Deform (MSH)', icon: Grid3x3 },
    { id: 'SPL', shortId: 'SPL', name: 'Spline Reshape', label: 'Spline Reshape Tool (SPL)', icon: Spline },
    { id: 'SWP', shortId: 'SWP', name: 'Smart Pin Warp', label: 'Smart Pin Anchor Warp (SWP)', icon: Anchor },
    { id: 'CAG', shortId: 'CAG', name: 'Cage Deform', label: 'Cage Bounding Deform (CAG)', icon: BoxSelect },
    { id: 'LQB', shortId: 'LQB', name: 'Liquify Brush', label: 'Liquify Smudge Brush (LQB)', icon: Droplets },
    { id: 'SPD', shortId: 'SPD', name: 'Stroke Pull', label: 'Direct Stroke Touch Pull (SPD)', icon: Hand },
    { id: 'SPT', shortId: 'SPT', name: 'Stroke Move', label: 'Direct Stroke Position Move (SPT)', icon: Move },
    { id: 'S3D', shortId: 'S3D', name: '2D-to-3D Engine', label: '2D-to-3D Depth Engine (S3D)', icon: Layers3 },
    { id: 'CON', shortId: 'CON', name: 'IK Constraint', label: 'Rig IK Constraints (CON)', icon: Lock },
    { id: 'MOT', shortId: 'MOT', name: 'Motion Path', label: 'Motion Path Trajectory (MOT)', icon: Route },
    { id: 'CPT', shortId: 'CPT', name: 'Curve Path', label: 'Curve Path Tool (CPT)', icon: GitFork },
    { id: 'VDF', shortId: 'VDF', name: 'Curve Deformer', label: 'Vector Curve Deformer (VDF)', icon: Workflow },
    { id: 'VPR', shortId: 'VPR', name: 'Pen Reshape', label: 'Vector Pen Reshape (VPR)', icon: PenLine },
    { id: 'PBM', shortId: 'PBM', name: 'Points Move', label: 'Direct Points Movement (PBM)', icon: Network },
    { id: 'RPD', shortId: 'RPD', name: 'Rigid Deform', label: 'Rigid Point Deform (RPD)', icon: Disc },
    { id: 'CRV', shortId: 'CRV', name: 'Curve Line', label: 'Curve Line Deformer (CRV)', icon: Activity },
    { id: 'EYE', shortId: 'EYE', name: 'Eyedropper', label: 'Eyedropper Color Picker (EYE)', icon: Pipette },
    { id: 'CONTOUR_EDITOR', shortId: 'CNE', name: 'Contour Editor', label: 'Contour Editor (Bezier & Points)', icon: Crosshair },
    { id: 'CUTTER', shortId: 'CTR', name: 'Cutter', label: 'Cutter Tool (Line Trim)', icon: Scissors },
    { id: 'MASTER_CONTROLLER', shortId: 'MCT', name: 'Master Controller', label: 'Master Controller Widgets (MCT)', icon: SlidersHorizontal },
    { id: 'PEG_HIERARCHY', shortId: 'PEG', name: 'Peg Hierarchy', label: 'Peg Hierarchy Rigging Tree (PEG)', icon: FolderTree },
    { id: 'BONE_CURVE', shortId: 'BNC', name: 'Bone Deformer', label: 'Bone & Curve Rig Deformer (BNC)', icon: Bone },
    { id: 'PTS', shortId: 'PTS', name: 'Point Sculptor', label: 'Point Shape Sculptor (PTS)', icon: CircleDot },
    { id: 'SCB', shortId: 'SCB', name: 'Sculpt Brush', label: 'Sculpt & Correct Brush (SCB)', icon: Paintbrush },
    { id: 'LIN', shortId: 'LIN', name: 'Line Shape', label: 'Line Shape Edit (LIN)', icon: Move },
    { id: 'SWAP_STUDIO', shortId: 'SWP', name: 'Swap Studio', label: 'Drawing Substitution Swap (SWP)', icon: RefreshCw },
    { id: 'TWT', shortId: 'TWT', name: 'Twitch Jitter', label: 'Twitch Shake & Jitter (TWT)', icon: Zap },
    { id: 'MWP', shortId: 'MWP', name: 'Mesh Puppet', label: 'Mesh Wrap Puppet Wrap (MWP)', icon: Grid3x3 },
  ];

  return (
    <div
      id="anim-toolbar-container"
      className={`bg-transparent border-0 flex flex-col h-full transition-all duration-200 shrink-0 select-none ${
        collapsed ? 'w-24' : 'w-72'
      }`}
    >
      {/* Brand / Collapse Header */}
      <div className="h-16 border-0 flex items-center justify-between px-3.5 shrink-0">
        {!collapsed && (
          <span className="text-sm font-black uppercase tracking-widest text-amber-500 dark:text-amber-400">
            Toolbox ({tools.length})
          </span>
        )}
        <button
          id="toolbar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          className="p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-black transition-all ml-auto cursor-pointer border-0 shadow-sm"
          title={collapsed ? "Expand toolbar" : "Collapse toolbar"}
        >
          {collapsed ? <Maximize2 className="w-6 h-6 stroke-[3.2]" /> : <Minimize2 className="w-6 h-6 stroke-[3.2]" />}
        </button>
      </div>

      {/* Tools List - larger buttons, bigger icons, bold thicker typography */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3.5 scrollbar-thin select-none items-center">
        {tools.map((t, idx) => {
          const isActive = activeTool === t.id;
          const Icon = t.icon;
          const isGroupDivider = [6, 14, 26, 36].includes(idx);
          return (
            <React.Fragment key={t.id}>
              {isGroupDivider && (
                <div className={`shrink-0 my-1 rounded-full bg-neutral-300 dark:bg-neutral-700/60 ${collapsed ? 'w-10 h-[2px]' : 'w-full h-[1.5px]'}`} />
              )}
              <button
                id={`tool-btn-${t.id}`}
                onClick={() => setActiveTool(t.id)}
                data-active-tool={isActive ? "true" : undefined}
                className={`relative group cursor-pointer border-0 shrink-0 transition-all ${
                  isActive ? 'active-tool-btn !bg-[#facc15] !text-black shadow-none scale-105 z-10' : ''
                } ${
                  collapsed
                    ? 'w-16 h-16 rounded-2xl flex items-center justify-center p-0'
                    : 'w-full flex items-center gap-3.5 p-3.5 rounded-2xl text-left min-h-[64px]'
                } ${
                  !isActive
                    ? 'bg-white hover:bg-neutral-100 text-black shadow-sm'
                    : ''
                }`}
                style={isActive ? { backgroundColor: '#facc15', color: '#000000', boxShadow: 'none' } : undefined}
                title={t.label}
              >
                <div className={`w-11 h-11 shrink-0 flex items-center justify-center rounded-xl ${isActive ? 'scale-110' : ''} transition-transform`}>
                  <Icon className={`w-7 h-7 stroke-[3.2] ${isActive ? '!text-black stroke-[3.8]' : 'text-black group-hover:text-amber-600'}`} />
                </div>
                {!collapsed && (
                  <div className="overflow-hidden truncate flex-1 min-w-0">
                    <span className={`text-xs uppercase tracking-wider block font-black leading-tight ${isActive ? '!text-black font-black' : 'text-neutral-600 dark:text-neutral-500'}`}>
                      {t.shortId || t.id}
                    </span>
                    <span className={`text-base font-black block leading-snug truncate transition-colors mt-0.5 ${isActive ? '!text-black font-black' : 'text-black group-hover:text-neutral-900'}`}>
                      {t.name || t.label.split('(')[0].trim()}
                    </span>
                  </div>
                )}

                {/* Collapsed Tooltip Overlay */}
                {collapsed && (
                  <div className="absolute left-20 bg-white border border-neutral-300 text-black text-xs font-black px-3.5 py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-2xl">
                    <div className="text-black font-black text-sm">{t.label}</div>
                  </div>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
